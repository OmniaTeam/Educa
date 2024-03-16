package com.omnia.scientia.groups.institute;

import com.omnia.scientia.groups.department.DepartmentEntity;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/institute")
public class InstituteController {

    final private InstituteRepository instituteRepository;

    public InstituteController(InstituteRepository instituteRepository) {
        this.instituteRepository = instituteRepository;
    }

    @GetMapping("/get/id/{instituteId}")
    ResponseEntity<?> getWithId(@PathVariable Long instituteId){
        var response =  instituteRepository.findById(instituteId);
        if (response.isPresent()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(instituteId, HttpStatusCode.valueOf(404));
    }

    @GetMapping("/get/all")
    ResponseEntity<?> getAll(){
        var response =  instituteRepository.findAll();
        return ResponseEntity.ok().body(response);
    }

    @PostMapping("/add")
    ResponseEntity<?> add(@RequestBody InstituteEntity body){
        var saved = instituteRepository.save(body);
        return new ResponseEntity<>(body,HttpStatusCode.valueOf(200));
    }

    @PutMapping("/edit")
    ResponseEntity<?> edit(@RequestBody InstituteEntity body){
        var origin = instituteRepository.findById(body.getId());
        if (origin.isPresent()) {
            instituteRepository.save(origin.get().copy(body));
            return new ResponseEntity<>(body.getId(), HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null, HttpStatusCode.valueOf(404));
    }




}
