package com.omnia.scientia.groups.lecture;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class LectureEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private Long subjectId;
    @Column(columnDefinition = "TEXT")
    private String text;
    private boolean summary = false;
    private boolean files = false;

    public LectureEntity copy(LectureEntity obj){
        this.name=obj.getName();
        this.subjectId= obj.getSubjectId();
        return this;
    }

}
