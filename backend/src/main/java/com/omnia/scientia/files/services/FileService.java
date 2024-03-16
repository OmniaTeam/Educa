package com.omnia.scientia.files.services;

import com.omnia.scientia.files.entity.FileEntity;
import com.omnia.scientia.files.entity.FileRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.List;

@Service
@Slf4j
public class FileService {

    final private FileRepository fileRepository;
    private final String projectPath = "/var/www/educa.theomnia.ru/files";
    public FileService(FileRepository fileRepository) {
        this.fileRepository = fileRepository;
    }

    public FileEntity create(MultipartFile file, Long lectureId){
        if (!file.isEmpty()) {
            var name = LocalDate.now().toString() + "_" + file.getOriginalFilename();
            var type = file.getContentType();
            var fileEntity = new FileEntity(name, type, lectureId);
            try {
                File destFile = new File(projectPath + File.separator + name);
                log.info("path {}", destFile);
                file.transferTo(destFile);
                fileRepository.save(fileEntity);
                return fileEntity ;
            } catch (IOException e) {
                log.error(e.getMessage());
                e.printStackTrace();
            }
        }
        return null;
    }
    public FileEntity create(MultipartFile file){
        if (!file.isEmpty()) {
            var name = LocalDate.now().toString() + "_" + file.getOriginalFilename();
            var type = file.getContentType();
            var fileEntity = new FileEntity(name, type);
            try {
                File destFile = new File(projectPath + File.separator + name);
                log.info("path {}", destFile);
                file.transferTo(destFile);
                fileRepository.save(fileEntity);
                return fileEntity ;
            } catch (IOException e) {
                log.error(e.getMessage());
                e.printStackTrace();
            }
        }
        return null;
    }


    public Path download(Long fileId) {
        var fileEntity = fileRepository.findById(fileId);
        return fileEntity.map(entity -> Paths.get(fileEntity.get().getDir()  + File.separator + entity.getName())).orElse(null);
    }

    public List<FileEntity> getLecture(Long lectureId){
        return fileRepository.findAllByLectureId(lectureId);
    }

}
