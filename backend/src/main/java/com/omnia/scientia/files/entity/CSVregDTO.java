package com.omnia.scientia.files.entity;

import com.omnia.scientia.auth.entites.ERole;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CSVregDTO {
    private String login;
    private String password;
    private String fio;
    private ERole role;
    private String position;
    private Long departmentId;
    private Integer semesterNumber;
    private Long directionId;
}
