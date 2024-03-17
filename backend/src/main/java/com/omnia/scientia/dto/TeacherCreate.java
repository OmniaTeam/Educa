package com.omnia.scientia.dto;

import lombok.Data;

@Data
public class TeacherCreate {
    private String fio;
    private String login;
    private String password;
    private String position;
    private Long departmentId;
}
