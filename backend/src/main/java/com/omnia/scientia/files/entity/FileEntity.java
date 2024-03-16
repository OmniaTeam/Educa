package com.omnia.scientia.files.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.File;

@Entity
@Data
@NoArgsConstructor
public class FileEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String type;
    private String dir = "/var/www/educa.theomnia.ru/files";
    private Long lectureId;
    private boolean processed = false;

    public FileEntity(String name, String type,Long lectureId) {
        this.name = name;
        this.type = type;
        this.lectureId = lectureId;
    }

    public FileEntity(String name, String type) {
        this.name = name;
        this.type = type;
    }

    public String getPath(){
        return this.dir + File.separator + this.getName();
    }
}
