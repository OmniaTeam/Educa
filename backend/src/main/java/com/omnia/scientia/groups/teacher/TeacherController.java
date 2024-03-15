package com.omnia.scientia.groups.teacher;

import com.omnia.scientia.dto.TeacherInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/teachers")
@RequiredArgsConstructor
public class TeacherController {
    private final TeacherRepository teacherRepository;
    @GetMapping("/get/info/user_id/{user_id}")
    ResponseEntity<TeacherInfoResponse> teacherInfo(@PathVariable Long user_id) {
        TeacherInfoResponse info = teacherRepository.findTeacherInfoByUserId(user_id);
        if (info == null) return ResponseEntity.status(404).build();
        return ResponseEntity.ok(info);
    }
}
