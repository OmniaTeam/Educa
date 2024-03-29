package com.omnia.scientia.groups.subject;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class SubjectEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private int semester;
    private Long teacherId;
    private Long directionId;

    public SubjectEntity copy(SubjectEntity obj){
        this.name=obj.getName();
        this.semester=obj.getSemester();
        this.directionId=obj.directionId;
        this.teacherId=obj.getTeacherId();
        return this;
    }
}
