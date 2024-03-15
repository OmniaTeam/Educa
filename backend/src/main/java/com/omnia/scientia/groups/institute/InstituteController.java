package com.omnia.scientia.groups.institute;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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




}
