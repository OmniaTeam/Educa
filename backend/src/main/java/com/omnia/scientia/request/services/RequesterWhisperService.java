package com.omnia.scientia.request.services;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class RequesterWhisperService {
    RestTemplate restTemplate = new RestTemplate();
    String baseUrl = "https://whisper.theomnia.ru/files";

    public String audioToText(String filePath) {

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        FileSystemResource file = new FileSystemResource(filePath);
        body.add("file", file);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(MediaType.MULTIPART_FORM_DATA);
        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, header);
        try {
            ResponseEntity<String> responseEntity = restTemplate.postForEntity(baseUrl, requestEntity, String.class);
            log.info("res {}", responseEntity);
            String text = responseEntity.getBody();
            text = text.substring(1, text.length() - 1).trim();
            return text;

        }
        catch (Exception ex) {
            log.error(ex.getMessage());
            return null;
        }

    }
}
