package com.omnia.scientia.request.controllers;

import com.omnia.scientia.request.RequestMaster;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/request")
public class RequestController {

    final private RequestMaster requestMaster;

    public RequestController(RequestMaster requestMaster) {
        this.requestMaster = requestMaster;
    }


    //Only for test
    @GetMapping("/summary/fileId/{fileId}")
    ResponseEntity<?> analyseWithoutBalance(@PathVariable Long fileId){

        var status = requestMaster.generateTextWithFile(fileId);
        if (status == 200){
            return new ResponseEntity<>(fileId,HttpStatusCode.valueOf(200));
        }
        if (status == 403){
            return new ResponseEntity<>(fileId,HttpStatusCode.valueOf(403));
        }

        return new ResponseEntity<>(fileId, HttpStatusCode.valueOf(404));
    }


}
