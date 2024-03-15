package com.omnia.scientia.groups.department;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/department")
@Slf4j
public class DepartmentController {

    final private DepartmentRepository departmentRepository;

    public DepartmentController(DepartmentRepository departmentRepository) {
        this.departmentRepository = departmentRepository;
    }


    @GetMapping("/get/id/{departmentId}")
    ResponseEntity<?> getWithId(@PathVariable Long departmentId){
        var response =  departmentRepository.findById(departmentId);
        if (response.isPresent()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(departmentId, HttpStatusCode.valueOf(404));
    }

    @GetMapping("/get/institute/{instituteId}")
    ResponseEntity<?> getWithInstitute(@PathVariable Long instituteId){
        var response =  departmentRepository.findAllByInstituteId(instituteId);
        if (!response.isEmpty()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(instituteId, HttpStatusCode.valueOf(404));
    }
}
