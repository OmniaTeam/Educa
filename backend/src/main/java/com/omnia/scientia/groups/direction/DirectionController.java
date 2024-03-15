package com.omnia.scientia.groups.direction;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/direction")
@Slf4j
public class DirectionController {

    final private DirectionRepository directionRepository;

    public DirectionController(DirectionRepository directionRepository) {
        this.directionRepository = directionRepository;
    }

    @GetMapping("/get/id/{directionId}")
    ResponseEntity<?> getWithId(@PathVariable Long directionId){
        var response =  directionRepository.findById(directionId);
        if (response.isPresent()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(directionId, HttpStatusCode.valueOf(404));
    }

    @GetMapping("/get/department/{departmentId}")
    ResponseEntity<?> getWithDepartment(@PathVariable Long departmentId){
        var response =  directionRepository.findAllByDepartmentId(departmentId);
        if (!response.isEmpty()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(departmentId, HttpStatusCode.valueOf(404));
    }

}
