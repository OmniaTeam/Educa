package com.omnia.scientia.groups.student;

import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.dto.StudentInfoResponse;
import com.omnia.scientia.dto.StudentSubjectResponse;
import com.omnia.scientia.groups.lecture.LectureEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;
    private final StudentRepository studentRepository;


    @GetMapping("/get/info")
    ResponseEntity<StudentInfoResponse> studentInfoByToken(Authentication authentication) {
        UserEntity user = (UserEntity) authentication.getPrincipal();
        StudentInfoResponse studentInfo = studentService.getStudentInfo(user.getId());
        if (studentInfo == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(studentInfo);
    }

    @GetMapping("/get/info/id/{student_id}")
    ResponseEntity<StudentInfoResponse> studentInfoByStudentId(@PathVariable Long student_id) {
        StudentInfoResponse info = studentRepository.findStudentInfoByStudentId(student_id);
        if (info == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(info);
    }

    @GetMapping("/get/subject/id/{student_id}")
    ResponseEntity<?> studentSubject(@PathVariable Long student_id) {
        List<StudentSubjectResponse> subjects = studentService.getStudentSubjects(student_id);
        if (subjects.isEmpty()){
            return new ResponseEntity<>(student_id, HttpStatusCode.valueOf(404));
        }
        return ResponseEntity.ok(subjects);
    }
    @GetMapping("/get/direction/{directionId}")
    ResponseEntity<?> studentDirection(@PathVariable Long directionId) {
        var student = studentRepository.findAllByDirectionId(directionId);
        if (student.isEmpty()){
            return new ResponseEntity<>(directionId, HttpStatusCode.valueOf(404));
        }
        return ResponseEntity.ok(student);
    }

    @PostMapping("/add")
    ResponseEntity<?> add(@RequestBody StudentEntity body){
        var saved = studentRepository.save(body);
        return new ResponseEntity<>(body,HttpStatusCode.valueOf(200));
    }

    @PutMapping("/edit")
    ResponseEntity<?> edit(@RequestBody StudentEntity body){
        var origin = studentRepository.findById(body.getId());
        if (origin.isPresent()) {
            studentRepository.save(origin.get().copy(body));
            return new ResponseEntity<>(body.getId(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));
    }

}
