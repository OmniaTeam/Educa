package com.omnia.scientia.auth.controllers;


import com.omnia.scientia.dto.UserCreate;
import com.omnia.scientia.dto.UserResponse;
import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.exceptions.AlreadyExistException;
import com.omnia.scientia.auth.services.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
    private final UserService userService;


    @PostMapping("/create/user")
    ResponseEntity<UserResponse> createUser(@RequestBody UserCreate userCreate) {

        UserEntity user = userService.userRegister(userCreate);
        return ResponseEntity.status(201).body(new UserResponse(user));
    }

    @DeleteMapping("/delete/user/{id}")
    ResponseEntity<?> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/create/user/csv")
    public ResponseEntity<?> createUsersFromCSV(@RequestParam("file") MultipartFile file) {
        // TODO: some CSV reader logic returns List<UserCreate>
        List<UserCreate> userCreates = new ArrayList<>();

        for (UserCreate user: userCreates
             ) {
            try {
                userService.userRegister(user);
            }
            catch (AlreadyExistException ex) {
                log.error(ex.getMessage());
            }
        }
        return ResponseEntity.ok().build();
    }

}
