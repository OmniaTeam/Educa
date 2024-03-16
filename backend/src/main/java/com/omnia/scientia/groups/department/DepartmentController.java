package com.omnia.scientia.groups.department;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    ResponseEntity<?> add(@RequestBody DepartmentEntity body){
        var saved = departmentRepository.save(body);
        return new ResponseEntity<>(body,HttpStatusCode.valueOf(200));
    }

    @PutMapping("/edit")
    ResponseEntity<?> edit(@RequestBody DepartmentEntity body){
        var origin = departmentRepository.findById(body.getId());
        if (origin.isPresent()) {
            departmentRepository.save(origin.get().copy(body));
            return new ResponseEntity<>(body.getId(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));
    }




}
