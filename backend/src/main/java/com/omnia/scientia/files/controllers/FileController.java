package com.omnia.scientia.files.controllers;

import com.omnia.scientia.files.services.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.InputStreamResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;

@RestController
@RequestMapping("/files")
@Slf4j
public class FileController {

    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/list/{lectureId}")
    public ResponseEntity<?> getWithLecture(@PathVariable Long lectureId){
        var files = fileService.getLecture(lectureId);
        if (files.isEmpty()){
            return new ResponseEntity<>("not found", HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(files, HttpStatus.OK);
    }


    @PostMapping("/upload/{lectureId}")
    public ResponseEntity<String> handleFileUpload(@RequestPart("file") MultipartFile file, @PathVariable Long lectureId) {
        try {
            var fileEntity = fileService.create(file, lectureId);
            return ResponseEntity.ok(fileEntity.toString());
        } catch (Exception ex) {
            log.error(ex.getMessage());
            return ResponseEntity.status(400).build();
        }
    }

    @GetMapping("/download/id/{file_id}")
    public ResponseEntity<?> downloadFile(@PathVariable Long file_id) throws IOException {

        var file = fileService.download(file_id);

        var resource = new InputStreamResource(Files.newInputStream(file));
        String mimeType = Files.probeContentType(file);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + file.getFileName().toString())
                .header(HttpHeaders.CONTENT_TYPE, mimeType)
                .body(resource);
    }

}
