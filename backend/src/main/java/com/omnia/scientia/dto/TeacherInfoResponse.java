package com.omnia.scientia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TeacherInfoResponse {
    Long teacherId;
    String fio;
    String institute;
    String department;
    String position;
}
