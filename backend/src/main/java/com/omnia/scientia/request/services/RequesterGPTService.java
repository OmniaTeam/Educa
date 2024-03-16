package com.omnia.scientia.request.services;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.omnia.scientia.dto.FileUploadResponse;
import com.omnia.scientia.dto.RetrieveRun;
import com.omnia.scientia.dto.ThreadRun;
import jakarta.validation.constraints.NotNull;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@Slf4j
public class RequesterGPTService {
    private final RestTemplate restTemplate = new RestTemplate();

    private final String baseUrl = "https://api.openai.com/v1";

    @Value("${GPT_TOKEN}")
    @NotNull
    private String tokenGPT;

    @Value("${assistant.file_id}")
    @NotNull
    private String assistantFileId;

    @Value("${assistant.text_id}")
    @NotNull
    private String assistantTextId;

    @Value("${assistant.answer_id}")
    @NotNull
    private String assistantAnswerId;


    public String fileLecture(String filePath) {
        try {
            FileUploadResponse file = sendFile(filePath);
            log.info("file {}", file);
            Thread.sleep(2000);
            ThreadRun thread = createAndRunThreadFile(file.getId());
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

    public String summaryTextLecture(String text) {
        try {
            String req = String.format("Сделай краткий конспект согласно твоим инструкциям, язык разметки markdown для следующего текста:\n%s", text);
            ThreadRun thread = createAndRunThreadText(req);
            if (checkStatusRun(thread.getThreadId(), thread.getId()) == null) {
                log.error("too long to process message");
            }
            String answer = listMessages(thread.getThreadId());
            log.info("ai answer {}", answer);
            return answer;

        }
        catch (Exception ex) {
            log.error("ai api error {}", ex.getMessage());
            return null;
        }
    }

    public String summaryAnswerLecture(String lecture, String question) {
        try {
            String req = String.format("На основе этой лекции\n%s\nОтветь на вопрос\n%s", lecture, question);
            ThreadRun thread = createAndRunThreadText(req);
            if (checkStatusRun(thread.getThreadId(), thread.getId()) == null) {
                log.error("too long to process message");
            }
            String answer = listMessages(thread.getThreadId());
            log.info("ai answer {}", answer);
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
        FileSystemResource file = new FileSystemResource(filePath);

        body.add("purpose", "assistants");
        body.add("file", file);
        log.info("file {}", file);
        HttpHeaders header = getHeader();
        header.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, header);
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

    private ThreadRun createAndRunThread(String body) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .path("/threads/runs").toUriString();

        HttpEntity<String> httpEntity = new HttpEntity<>(body, getHeader());
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(url, httpEntity, String.class);
        log.info("req {}", responseEntity);

        try {
            ObjectMapper mapper = new ObjectMapper();

            JsonNode jsonNode = mapper.readTree(responseEntity.getBody());

            String id = jsonNode.get("id").asText();
            String threadId = jsonNode.get("thread_id").asText();

            System.out.println("ID: " + id);
            System.out.println("Thread ID: " + threadId);
            ThreadRun threadRun = new ThreadRun();
            threadRun.setId(id);
            threadRun.setThreadId(threadId);
            return threadRun;
        } catch (Exception e) {
            System.out.println("Ошибка при извлечении данных из JSON: " + e.getMessage());
            return null;
        }
    }

    private ThreadRun createAndRunThreadFile(String fileId) {

        String body = String.format("""
      {
      "assistant_id": "%s",
      "thread": {
        "messages": [
          {"role": "user",
          "content": "Сделай полный конспект из файла согласно твоим инструкциям, язык разметки markdown",
          "file_ids": ["%s"]
          }
        ]
      }
    }
                """,
                assistantFileId, fileId);

       return createAndRunThread(body);
    }

    private ThreadRun createAndRunThreadText(String text) {

        String body = String.format("""
      {
      "assistant_id": "%s",
      "thread": {
        "messages": [
          {"role": "user",
          "content": "%s"
          }
        ]
      }
    }
                """,
                assistantTextId, text);

        return createAndRunThread(body);
    }

    private ThreadRun createAndRunThreadAnswer(String text) {

        String body = String.format("""
      {
      "assistant_id": "%s",
      "thread": {
        "messages": [
          {"role": "user",
          "content": "%s"
          }
        ]
      }
    }
                """,
                assistantAnswerId, text);

        return createAndRunThread(body);
    }

    private RetrieveRun retrieveRun(String threadId, String runId) {
        String url = UriComponentsBuilder.fromHttpUrl(baseUrl)
                .path("/threads").path("/{threadId}")
                .path("/runs").path("/{runId}").buildAndExpand(threadId, runId).toUriString();
        log.info(url);
        HttpHeaders header = new HttpHeaders();
        header.set("Authorization", String.format("Bearer %s", tokenGPT) );
        header.set("OpenAI-Beta", "assistants=v1");
        log.info("header {}", header);
        HttpEntity<String> requestEntity = new HttpEntity<>(header);

        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        try {
            ObjectMapper mapper = new ObjectMapper();

            JsonNode jsonNode = mapper.readTree(responseEntity.getBody());

            String status = jsonNode.get("status").asText();
            log.info("status");
            log.info("status {}", status);
            RetrieveRun retrieveRun = new RetrieveRun();
            retrieveRun.setStatus(status);
            return retrieveRun;
        } catch (Exception e) {
            System.out.println("Ошибка при извлечении данных из JSON: " + e.getMessage());
            return null;
        }
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
        ResponseEntity<String> responseEntity = restTemplate.exchange(url, HttpMethod.GET, requestEntity, String.class);
        try {
            ObjectMapper mapper = new ObjectMapper();

            JsonNode jsonNode = mapper.readTree(responseEntity.getBody());
            String value = jsonNode.get("data").get(0).get("content").get(0).get("text").get("value").asText();
            log.info("list messages {}", value);
            return value;
        } catch (Exception e) {
            System.out.println("Ошибка при извлечении данных из JSON: " + e.getMessage());
            return null;
        }
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
