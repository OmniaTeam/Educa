package com.omnia.scientia.groups.department;

import com.omnia.scientia.exceptions.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DepartmentService {
    private final DepartmentRepository departmentRepository;
    public DepartmentEntity getDepartmentById(Long id) {
        return departmentRepository.findById(id).orElseThrow(() -> new NotFoundException("Department"));
    }
}
