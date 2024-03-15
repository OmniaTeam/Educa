package com.omnia.scientia.groups.student;

import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.dto.StudentInfoResponse;
import com.omnia.scientia.groups.subject.SubjectEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/students")
@RequiredArgsConstructor
public class StudentController {

    private final StudentService studentService;


    @GetMapping("/get/info")
    ResponseEntity<StudentInfoResponse> studentInfoByToken(Authentication authentication) {
        UserEntity user = (UserEntity) authentication.getPrincipal();
        return ResponseEntity.ok(studentService.getStudentInfo(user.getId()));
    }

    @GetMapping("/get/info/user_id/{user_id}")
    ResponseEntity<StudentInfoResponse> studentInfo(@PathVariable Long user_id) {
        StudentInfoResponse info = studentService.getStudentInfo(user_id);
        if (info == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(info);
    }

    @GetMapping("/get/subject/id/{student_id}")
    ResponseEntity<?> studentSubject(@PathVariable Long student_id) {
        List<SubjectEntity> subjects = studentService.getStudentSubjects(student_id);
        if (subjects.isEmpty()){
            return new ResponseEntity<>(student_id, HttpStatusCode.valueOf(404));
        }
        return ResponseEntity.ok(subjects);
    }

}
