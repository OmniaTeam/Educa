package com.omnia.scientia.request.controllers;

import com.omnia.scientia.dto.Question;
import com.omnia.scientia.request.RequestMaster;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/request")
@Slf4j
public class RequestController {

    final private RequestMaster requestMaster;

    public RequestController(RequestMaster requestMaster) {
        this.requestMaster = requestMaster;
    }


    //Only for test
    @PostMapping("/question/lecture/id/{lecture_id}")
    ResponseEntity<?> analyseWithoutBalance(@PathVariable Long lecture_id, @RequestBody Question question){

        return ResponseEntity.ok().body(requestMaster.questionLecture(lecture_id, question.getQuestion()));
    }


}
