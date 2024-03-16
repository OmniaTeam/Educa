package com.omnia.scientia.groups.institute;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class InstituteEntity {
@Id
@GeneratedValue(strategy = GenerationType.AUTO)
private Long id;
private String director;
private String name;

public InstituteEntity copy(InstituteEntity obj){
    this.director=obj.getDirector();
    this.name=obj.getName();
    return this;
}


}
