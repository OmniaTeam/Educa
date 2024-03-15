package com.omnia.scientia.groups.lecture;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/lecture")
public class LectureController {

    final private LectureRepository lectureRepository;

    public LectureController(LectureRepository lectureRepository) {
        this.lectureRepository = lectureRepository;
    }

    @GetMapping("/get/id/{lectureId}")
    ResponseEntity<?> getWithId(@PathVariable Long lectureId){
        var response =  lectureRepository.findById(lectureId);
        if (response.isPresent()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(lectureId, HttpStatusCode.valueOf(404));
    }

    @GetMapping("/get/subject/{subjectId}")
    ResponseEntity<?> getWithSubject(@PathVariable Long subjectId){
        var response =  lectureRepository.findAllBySubjectId(subjectId);
        if (!response.isEmpty()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(subjectId, HttpStatusCode.valueOf(404));
    }


}
