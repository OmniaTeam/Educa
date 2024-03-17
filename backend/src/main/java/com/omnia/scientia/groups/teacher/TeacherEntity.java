package com.omnia.scientia.groups.teacher;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class TeacherEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String position;
    private Long userId;
    private Long departmentId;

    public TeacherEntity(String position, Long userId, Long departmentId) {
        this.position = position;
        this.userId = userId;
        this.departmentId = departmentId;
    }

    public TeacherEntity copy(TeacherEntity obj){
        this.position = obj.getPosition();
        this.departmentId = obj.getDepartmentId();
        this.userId = obj.getUserId();
        return this;
    }
}
