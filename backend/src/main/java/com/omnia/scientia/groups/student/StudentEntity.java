package com.omnia.scientia.groups.student;

import com.omnia.scientia.auth.entites.UserEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer semesterNumber;
    private Long userId;
    private Long directionId;

    public StudentEntity(Integer semesterNumber, Long userId, Long directionId) {
        this.semesterNumber = semesterNumber;
        this.userId = userId;
        this.directionId = directionId;
    }

    public StudentEntity copy(StudentEntity obj){
        this.directionId = obj.getDirectionId();
        this.semesterNumber=obj.getSemesterNumber();
        this.userId=obj.getUserId();
        return this;
    }
}
