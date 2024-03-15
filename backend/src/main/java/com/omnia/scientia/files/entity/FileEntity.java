package com.omnia.scientia.files.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jdk.jfr.Enabled;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class FileEntity {
    @Id
    private Long id;
    private String name;
    private String type;
    private String dir = "./files/";
    private Long lectureId;

    public FileEntity(String name, String type,Long lectureId) {
        this.name = name;
        this.type = type;
        this.lectureId = lectureId;
    }

    public String getPath(){
        return this.dir + this.getName();
    }
}
