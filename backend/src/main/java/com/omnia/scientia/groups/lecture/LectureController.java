package com.omnia.scientia.groups.lecture;

import com.omnia.scientia.groups.institute.InstituteEntity;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    ResponseEntity<?> add(@RequestBody LectureEntity body){
        var saved = lectureRepository.save(body);
        return new ResponseEntity<>(body,HttpStatusCode.valueOf(200));
    }

    @PutMapping("/edit")
    ResponseEntity<?> edit(@RequestBody LectureEntity body){
        var origin = lectureRepository.findById(body.getId());
        if (origin.isPresent()) {
            lectureRepository.save(origin.get().copy(body));
            return new ResponseEntity<>(body.getId(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));
    }

}
