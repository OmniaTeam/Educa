package com.omnia.scientia.groups.direction;

import com.omnia.scientia.groups.department.DepartmentEntity;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/add")
    ResponseEntity<?> add(@RequestBody DirectionEntity body){
        var saved = directionRepository.save(body);
        return new ResponseEntity<>(body,HttpStatusCode.valueOf(200));
    }

    @PutMapping("/edit")
    ResponseEntity<?> edit(@RequestBody DirectionEntity body){
        var origin = directionRepository.findById(body.getId());
        if (origin.isPresent()) {
            directionRepository.save(origin.get().copy(body));
            return new ResponseEntity<>(body.getId(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));
    }

}
