package com.omnia.scientia.files.controllers;

import com.omnia.scientia.files.services.CSVMaster;
import com.omnia.scientia.files.services.FileService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/csv")
@Slf4j
public class CSVController {
    final private CSVMaster csvMaster;
    final private FileService fileService;

    public CSVController(CSVMaster csvMaster, FileService fileService) {
        this.csvMaster = csvMaster;
        this.fileService = fileService;
    }



    @PostMapping("/upload")
    public ResponseEntity<?> handleFileUpload(@RequestPart("file") MultipartFile file) {
        try {
            var fileEntity = fileService.create(file);
            var response = csvMaster.read(fileEntity);
            if (!response.isEmpty()){
                return new ResponseEntity<>(response,HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(fileEntity.getId(),HttpStatusCode.valueOf(403));

        } catch (Exception ex) {
            log.error(ex.getMessage());
            return new ResponseEntity<>(null,HttpStatusCode.valueOf(400));
        }
    }



}
