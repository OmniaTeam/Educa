package com.omnia.scientia.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class StudentSubjectResponse {
    private Long id;
    private String name;
    private int semester;
    private Long teacherId;
    private Long directionId;
    private String teacherFio;
}
