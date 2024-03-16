package com.omnia.scientia.groups.teacher;

import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.dto.TeacherInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherRepository teacherRepository;

    @GetMapping("/get/info")
    ResponseEntity<TeacherInfoResponse> studentInfoByToken(Authentication authentication) {
        UserEntity user = (UserEntity) authentication.getPrincipal();
        TeacherInfoResponse teacher = teacherRepository.findTeacherInfoByUserId(user.getId());
        if (teacher == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(teacher);
    }

    @GetMapping("/get/info/id/{teacher_id}")
    ResponseEntity<TeacherInfoResponse> teacherInfoByTeacherId(@PathVariable Long teacher_id) {
        TeacherInfoResponse info = teacherRepository.findTeacherInfoByTeacherId(teacher_id);
        if (info == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(info);
    }

    @GetMapping("/get/department/{departmentId}")
    ResponseEntity<?> studentDirection(@PathVariable Long departmentId) {
        var teachers = teacherRepository.findAllByDepartmentId(departmentId);
        if (teachers.isEmpty()){
            return new ResponseEntity<>(departmentId, HttpStatusCode.valueOf(404));
        }
        return ResponseEntity.ok(teachers);
    }

    @PostMapping("/add")
    ResponseEntity<?> add(@RequestBody TeacherEntity body){
        var saved = teacherRepository.save(body);
        return new ResponseEntity<>(body, HttpStatusCode.valueOf(200));
    }

    @PutMapping("/edit")
    ResponseEntity<?> edit(@RequestBody TeacherEntity body){
        var origin = teacherRepository.findById(body.getId());
        if (origin.isPresent()) {
            teacherRepository.save(origin.get().copy(body));
            return new ResponseEntity<>(body.getId(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));
    }
}
