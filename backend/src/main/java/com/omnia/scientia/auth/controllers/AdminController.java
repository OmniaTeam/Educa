package com.omnia.scientia.auth.controllers;


import com.omnia.scientia.auth.entites.ERole;
import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.auth.repositories.UserRepository;
import com.omnia.scientia.auth.services.CSVRegistrationService;
import com.omnia.scientia.auth.services.UserService;
import com.omnia.scientia.dto.StudentCreate;
import com.omnia.scientia.dto.TeacherCreate;
import com.omnia.scientia.dto.UserCreate;
import com.omnia.scientia.dto.UserResponse;
import com.omnia.scientia.exceptions.NotFoundException;
import com.omnia.scientia.groups.student.StudentEntity;
import com.omnia.scientia.groups.student.StudentRepository;
import com.omnia.scientia.groups.teacher.TeacherEntity;
import com.omnia.scientia.groups.teacher.TeacherRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/admin")
@RequiredArgsConstructor
@Slf4j
public class AdminController {
    private final UserService userService;
    private final StudentRepository studentRepository;
    private final TeacherRepository teacherRepository;
    private final UserRepository userRepository;
    final private CSVRegistrationService csvRegistrationService;


    @PostMapping("/create/user")
    ResponseEntity<UserResponse> createUser(@RequestBody UserCreate userCreate) {

        UserEntity user = userService.userRegister(new UserEntity(userCreate));
        return ResponseEntity.status(201).body(new UserResponse(user));
    }

    @PostMapping("/create/student")
    ResponseEntity<?> createStudent(@RequestBody StudentCreate studentCreate) {
        UserEntity user = new UserEntity();
        user.setFio(studentCreate.getFio());
        user.setLogin(studentCreate.getLogin());
        user.setPassword(studentCreate.getPassword());
        user.setRole(ERole.Student);
        user = userService.userRegister(user);
        StudentEntity student = new StudentEntity();
        student.setUserId(user.getId());
        student.setSemesterNumber(studentCreate.getSemesterNumber());
        student.setDirectionId(studentCreate.getDirectionId());
        studentRepository.save(student);
        return ResponseEntity.status(201).body(student);
    }


    @PostMapping("/create/teacher")
    ResponseEntity<?> createTeacher(@RequestBody TeacherCreate teacherCreate) {
        UserEntity user = new UserEntity();
        user.setFio(teacherCreate.getFio());
        user.setLogin(teacherCreate.getLogin());
        user.setPassword(teacherCreate.getPassword());
        user.setRole(ERole.Teacher);
        user = userService.userRegister(user);
        TeacherEntity teacher = new TeacherEntity();
        teacher.setUserId(user.getId());
        teacher.setPosition(teacherCreate.getPosition());
        teacher.setDepartmentId(teacherCreate.getDepartmentId());
        teacherRepository.save(teacher);
        return ResponseEntity.status(201).body(teacher);
    }
    @PostMapping("/create/teacher/{userId}")
    ResponseEntity<?> createTeacher(@RequestBody TeacherCreate teacherCreate,@PathVariable Long userId) {
        var user = userService.getUserById(userId);
        user.setRole(ERole.Teacher);
        userService.userRegister(user);
        TeacherEntity teacher = new TeacherEntity();
        teacher.setUserId(user.getId());
        teacher.setPosition(teacherCreate.getPosition());
        teacher.setDepartmentId(teacherCreate.getDepartmentId());
        teacherRepository.save(teacher);
        return ResponseEntity.status(201).body(teacher);
    }
    @PostMapping("/create/student/{userId}")
    ResponseEntity<?> createStudent(@RequestBody StudentCreate studentCreate,@PathVariable Long userId) {
        var user = userService.getUserById(userId);
        user.setRole(ERole.Student);
        userService.userRegister(user);
        StudentEntity student = new StudentEntity();
        student.setUserId(user.getId());
        student.setSemesterNumber(studentCreate.getSemesterNumber());
        student.setDirectionId(studentCreate.getDirectionId());
        studentRepository.save(student);
        return ResponseEntity.status(201).body(student);
    }


    @DeleteMapping("/delete/student/{id}")
    ResponseEntity<?> deleteStudent(@PathVariable Long id) {
        StudentEntity student = studentRepository.findById(id).orElseThrow(() -> new NotFoundException("student"));
        studentRepository.delete(student);
        UserEntity user = userService.getUserById(student.getUserId());
        userRepository.delete(user);
        return ResponseEntity.ok().build();
    }


    @DeleteMapping("/delete/teacher/{id}")
    ResponseEntity<?> deleteTeacher(@PathVariable Long id) {
        TeacherEntity teacher = teacherRepository.findById(id).orElseThrow(() -> new NotFoundException("teacher"));
        teacherRepository.delete(teacher);
        UserEntity user = userService.getUserById(teacher.getUserId());
        userRepository.delete(user);
        return ResponseEntity.ok().build();
    }
    @PostMapping("/create/user/csv")
    public ResponseEntity<?> createUsersFromCSV(@RequestParam("file") MultipartFile file) {
        var response = csvRegistrationService.add(file);
        if (!response.isEmpty()){
            return new ResponseEntity<>(response, HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null,HttpStatusCode.valueOf(404));
    }
    @GetMapping("/get/user/vkid")
    ResponseEntity<?> vkid(){
        var response = userRepository.findAllByRole(ERole.Guest);
        if (!response.isEmpty()){
            return new ResponseEntity<>(response.stream().map(UserResponse::new),HttpStatusCode.valueOf(200));
        }
        return new ResponseEntity<>(null,HttpStatusCode.valueOf(404));
    }

}
