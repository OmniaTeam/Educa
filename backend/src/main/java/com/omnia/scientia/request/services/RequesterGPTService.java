package com.omnia.scientia.request.services;

import com.omnia.scientia.dto.FileUploadResponse;
import com.omnia.scientia.dto.ListMessagesResponse;
import com.omnia.scientia.dto.RetrieveRun;
import com.omnia.scientia.dto.ThreadRun;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.File;
import java.util.Objects;

@Service
@Slf4j
public class RequesterGPTService {
    private final RestTemplate restTemplate = new RestTemplate();

    private final String baseUrl = "https://api.openai.com/v1";

    @Value("${GPT_TOKEN}")
    @NotNull
    private String tokenGPT;

    @Value("${assistant.id}")
    @NotNull
    private String assistantId;


    public String summaryLecture(String filePath) {
        try {
            FileUploadResponse file = sendFile(filePath);
            Thread.sleep(2000);
            ThreadRun thread = createAndRunThread(file.getId());
            if (checkStatusRun(thread.getThreadId(), thread.getId()) == null) {
                log.error("too long to process message");
                clearAssistant(file.getId(), thread.getThreadId());
            }
            String answer = listMessages(thread.getThreadId());
            log.info("ai answer {}", answer);
            clearAssistant(file.getId(), thread.getThreadId());
            return answer;

        }
        catch (Exception ex) {
            log.error("ai api error {}", ex.getMessage());
            return null;
        }
    }

    private FileUploadResponse sendFile(String filePath) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .path("/files").toUriString();

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("purpose", "assistants");
        body.add("file", new File(filePath));
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, getHeader());
        ResponseEntity<FileUploadResponse> responseEntity = restTemplate.postForEntity(url, requestEntity, FileUploadResponse.class);
        log.info("send file response: {}", responseEntity);
        log.info("send file json: {}", responseEntity.getBody());
        return responseEntity.getBody();
    }

    private boolean deleteFile(String fileId) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .path("/files").path("/{fileId}").buildAndExpand(fileId).toUriString();
        HttpEntity<String> requestEntity = new HttpEntity<>(getHeader());
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);
        log.info("send file response: {}", responseEntity);
        log.info("send file json: {}", responseEntity.getBody());
        return responseEntity.getStatusCode() == HttpStatus.OK;
    }

    private ThreadRun createAndRunThread(String fileId) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .path("/threads/runs").toUriString();

        String body = String.format("""
      {
      "assistant_id": "%s",
      "thread": {
        "messages": [
          {"role": "user",
          "content": "Сделай краткий конспект согласно твоим инструкциям",
          "file_ids": ["%s"]
          }
        ]
      }
    }
                """,
                assistantId, fileId);

        HttpEntity<String> httpEntity = new HttpEntity<>(body, getHeader());
        ResponseEntity<ThreadRun> responseEntity = restTemplate.postForEntity(url, httpEntity, ThreadRun.class);


        ThreadRun threadRun = responseEntity.getBody();
        log.info("send file response: {}", responseEntity);
        log.info("send file json: {}", threadRun);
        return threadRun;
    }

    private RetrieveRun retrieveRun(String threadId, String runId) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .path("/threads").path("/{threadId}")
                .path("/runs").path("/{runId}").buildAndExpand(threadId, runId).toUriString();
        HttpEntity<String> requestEntity = new HttpEntity<>(getHeader());
        ResponseEntity<RetrieveRun> responseEntity = restTemplate.getForEntity(url, RetrieveRun.class, requestEntity);
        log.info("send file response: {}", responseEntity);
        log.info("send file json: {}", responseEntity.getBody());
        return responseEntity.getBody();
    }

    private RetrieveRun checkStatusRun(String threadId, String runId) {
        long startTime = System.currentTimeMillis();

        while (true) {
            RetrieveRun retrieveRun = retrieveRun(threadId, runId);
            log.info("retrieve run {}", retrieveRun);
            if (retrieveRun.getStatus().equals("completed")) {
                return retrieveRun;
            }

            long currentTime = System.currentTimeMillis();
            if (currentTime - startTime >= 120000) {

                return null;
            }

            try {
                Thread.sleep(10000); // Подождать 10 секунд
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }

    private String listMessages(String threadId) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .path("/threads").path("/{threadId}")
                .path("/messages").buildAndExpand(threadId).toUriString();
        HttpEntity<String> requestEntity = new HttpEntity<>(getHeader());
        ResponseEntity<ListMessagesResponse> responseEntity = restTemplate.getForEntity(url, ListMessagesResponse.class, requestEntity);
        String value = Objects.requireNonNull(responseEntity.getBody()).getData().get(0).getContent().get(0).getText().getValue();
        log.info("list messages {}", responseEntity);
        log.info("list messages {}", responseEntity.getBody());
        log.info("list messages {}", value);
        return value;
    }

    private void deleteThread(String threadId) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .path("/threads").path("/{threadId}")
                .buildAndExpand(threadId).toUriString();
        HttpEntity<String> requestEntity = new HttpEntity<>(getHeader());
        ResponseEntity<String> res = restTemplate.exchange(url, HttpMethod.DELETE, requestEntity, String.class);
        log.info("delete thread {}", res);
    }

    private void clearAssistant(String fileId, String threadId) {
        deleteThread(threadId);
        deleteFile(fileId);
    }

    private HttpHeaders getHeader() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.set("Authorization", String.format("Bearer %s", tokenGPT) );
        headers.set("OpenAI-Beta", "assistants=v1");
        return headers;
    }
}
