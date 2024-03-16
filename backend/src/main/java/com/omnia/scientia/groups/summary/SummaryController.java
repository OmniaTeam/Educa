package com.omnia.scientia.groups.summary;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/summary")
public class SummaryController {

    final private SummaryRepository summaryRepository;

    public SummaryController(SummaryRepository summaryRepository) {
        this.summaryRepository = summaryRepository;
    }

    @GetMapping("/get/all")
    ResponseEntity<?> getAll(){
        var all = summaryRepository.findAll();
        if (!all.isEmpty()){
            return new ResponseEntity<>(all, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null,HttpStatusCode.valueOf(404));
    }


}
