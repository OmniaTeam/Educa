package com.omnia.scientia.groups.subject;

import com.omnia.scientia.groups.student.StudentEntity;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/subject")
public class SubjectController {

    final private SubjectRepository subjectRepository;

    public SubjectController(SubjectRepository subjectRepository) {
        this.subjectRepository = subjectRepository;
    }

    @GetMapping("/get/id/{subjectId}")
    ResponseEntity<?> getWithId(@PathVariable Long subjectId){
        var response =  subjectRepository.findById(subjectId);
        if (response.isPresent()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(subjectId, HttpStatusCode.valueOf(404));
    }

    @GetMapping("/get/direction/{directionId}")
    ResponseEntity<?> getWithDirection(@PathVariable Long directionId){
        var response =  subjectRepository.findAllByDirectionId(directionId);
        if (!response.isEmpty()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(directionId, HttpStatusCode.valueOf(404));
    }

    @GetMapping("/get/teacher/{teacherId}")
    ResponseEntity<?> getWithTeacher(@PathVariable Long teacherId){
        var response =  subjectRepository.findAllByTeacherId(teacherId);
        if (!response.isEmpty()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(teacherId, HttpStatusCode.valueOf(404));
    }

    @PostMapping("/add")
    ResponseEntity<?> add(@RequestBody SubjectEntity body){
        var saved = subjectRepository.save(body);
        return new ResponseEntity<>(body,HttpStatusCode.valueOf(200));
    }

    @PutMapping("/edit")
    ResponseEntity<?> edit(@RequestBody SubjectEntity body){
        var origin = subjectRepository.findById(body.getId());
        if (origin.isPresent()) {
            subjectRepository.save(origin.get().copy(body));
            return new ResponseEntity<>(body.getId(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));
    }
}
