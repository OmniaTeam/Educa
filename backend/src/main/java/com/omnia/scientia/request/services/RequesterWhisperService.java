package com.omnia.scientia.request.services;

import com.omnia.scientia.dto.FileUploadResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

@Service
@RequiredArgsConstructor
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
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(baseUrl, requestEntity, String.class);
        String text = responseEntity.getBody();
        text = text.substring(1, text.length() - 1).trim();
        return text;
    }
}
