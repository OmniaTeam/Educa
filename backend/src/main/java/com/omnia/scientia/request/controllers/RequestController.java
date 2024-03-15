package com.omnia.scientia.request.controllers;

import com.omnia.scientia.files.entity.FileRepository;
import com.omnia.scientia.request.services.RequesterGPTService;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/request")
public class RequestController {

    final private FileRepository  fileRepository;
    final private RequesterGPTService gptService;


    public RequestController(FileRepository fileRepository, RequesterGPTService gptService) {
        this.fileRepository = fileRepository;
        this.gptService = gptService;
    }

    //Only for test
    @GetMapping("/summary/fileId/{fileId}")
    ResponseEntity<?> analyseWithoutBalance(@PathVariable Long fileId){
        var response = fileRepository.findById(fileId);
        if (response.isPresent()){
            var summary = gptService.summaryLecture(response.get().getPath());
            if (summary != null && !summary.isEmpty()) {
                return new ResponseEntity<>(summary,HttpStatusCode.valueOf(200));
            }
            return new ResponseEntity<>(fileId,HttpStatusCode.valueOf(403));
        }
        return new ResponseEntity<>(fileId, HttpStatusCode.valueOf(404));
    }


}
