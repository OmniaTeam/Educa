package com.omnia.scientia.auth.services;

import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.files.entity.CSVregDTO;
import com.omnia.scientia.files.services.CSVMaster;
import com.omnia.scientia.files.services.FileService;
import com.omnia.scientia.groups.student.StudentEntity;
import com.omnia.scientia.groups.student.StudentRepository;
import com.omnia.scientia.groups.teacher.TeacherEntity;
import com.omnia.scientia.groups.teacher.TeacherRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
@AllArgsConstructor
@Slf4j
public class CSVRegistrationService {

    final private UserService userService;
    final private TeacherRepository teacherRepository;
    final private StudentRepository studentRepository;
    final private FileService fileService;
    final private CSVMaster csvMaster;


    public List<CSVregDTO> add(MultipartFile file){
        try {
            var fileEntity = fileService.create(file);
            var response = csvMaster.read(fileEntity);
            fileService.deleteFile(fileEntity);
            if (!response.isEmpty()){
                distribute(response);
                return response;
            }
        } catch (Exception ex) {
            log.error(ex.getMessage());
        }

        return null;
    }

    private void distribute(List<CSVregDTO> csv_list) {
        for (var csv : csv_list) {
            var user = new UserEntity(csv);
            userService.userRegister(user);

            switch (csv.getRole()) {
                case Teacher -> {
                    var position = csv.getPosition();
                    var departmentId = csv.getDepartmentId();
                    if (position != null && departmentId != null) {
                        var teacher = new TeacherEntity(position, user.getId(), departmentId);
                        if (teacherRepository != null && teacherRepository.findByUserId(user.getId()).isEmpty()) {
                            teacherRepository.save(teacher);
                        }
                    }
                }


                case Student -> {
                    var semesterNumber = csv.getSemesterNumber();
                    var directionId = csv.getDirectionId();
                    if (semesterNumber != null && directionId != null) {
                        var student = new StudentEntity(semesterNumber, user.getId(), directionId);
                        if (studentRepository != null && studentRepository.findByUserId(user.getId()).isEmpty()) {
                            studentRepository.save(student);
                        }
                    }
                }


            }

        }


    }
}
