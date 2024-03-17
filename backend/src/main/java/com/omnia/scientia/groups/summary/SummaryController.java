package com.omnia.scientia.groups.summary;

import com.omnia.scientia.groups.subject.SubjectEntity;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    @GetMapping("/get/lecture/{lectureId}")
    ResponseEntity<?> lecture(@PathVariable Long lectureId){
        var response = summaryRepository.findAllByLectureId(lectureId);
        if (!response.isEmpty()){
            return new ResponseEntity<>(response,HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(lectureId,HttpStatusCode.valueOf(404));
    }
    @PutMapping("/edit")
    ResponseEntity<?> edit(@RequestBody SummaryEntity body){
        var origin = summaryRepository.findById(body.getId());
        if (origin.isPresent()) {
            summaryRepository.save(origin.get().copy(body));
            return new ResponseEntity<>(body.getId(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));
    }


}
