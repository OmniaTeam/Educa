package com.omnia.scientia.groups.student;

import com.omnia.scientia.dto.StudentInfoResponse;
import com.omnia.scientia.dto.StudentSubjectResponse;
import com.omnia.scientia.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class StudentService {

    private final StudentRepository studentRepository;
    public StudentEntity getStudentById(Long id) {
        return studentRepository.findById(id).orElseThrow(() -> new NotFoundException("Student"));
    }

    public StudentEntity getStudentByUserId(Long id) {
        return studentRepository.findByUserId(id).orElseThrow(() -> new NotFoundException("Student by user id " + id.toString()));
    }

    public StudentInfoResponse getStudentInfo(Long userId) {
        return studentRepository.findStudentInfoByUserId(userId);
    }

    public List<StudentSubjectResponse> getStudentSubjects(Long id) {
        return studentRepository.findAllStudentSubjectsByStudentId(id);
    }
}
