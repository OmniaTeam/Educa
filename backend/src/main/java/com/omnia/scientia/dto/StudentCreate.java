package com.omnia.scientia.dto;

import lombok.Data;

@Data
public class StudentCreate {
    private String fio;
    private String login;
    private String password;
    private Integer semesterNumber;
    private Long directionId;
}
