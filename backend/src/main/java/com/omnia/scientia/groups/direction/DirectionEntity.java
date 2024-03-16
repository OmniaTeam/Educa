package com.omnia.scientia.groups.direction;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class DirectionEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Long departmentId;

    public DirectionEntity copy(DirectionEntity obj){
        this.departmentId= obj.getDepartmentId();
        this.name=obj.getName();
        return this;
    }
}
