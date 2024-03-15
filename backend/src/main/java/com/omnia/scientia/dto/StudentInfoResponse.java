package com.omnia.scientia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentInfoResponse {
    Long studentId;
    String fio;
    Integer semesterNumber;
    String institute;
    String department;
    String direction;
}
