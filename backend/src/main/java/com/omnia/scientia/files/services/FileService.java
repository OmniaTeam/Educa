package com.omnia.scientia.files.services;

import com.omnia.scientia.exceptions.NotFoundException;
import com.omnia.scientia.files.entity.FileEntity;
import com.omnia.scientia.files.entity.FileRepository;
import com.omnia.scientia.groups.lecture.LectureEntity;
import com.omnia.scientia.groups.lecture.LectureRepository;
import lombok.RequiredArgsConstructor;
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
@RequiredArgsConstructor
@Slf4j
public class FileService {

    final private FileRepository fileRepository;
    final private LectureRepository lectureRepository;
    private final String projectPath = "/var/www/educa.theomnia.ru/files";

    public FileEntity create(MultipartFile file, Long lectureId){
        if (!file.isEmpty()) {
            LectureEntity lecture = lectureRepository.findById(lectureId).orElseThrow(() -> new NotFoundException("teacher"));
            var name = LocalDate.now().toString() + "_" + file.getOriginalFilename();
            var type = file.getContentType();
            var fileEntity = new FileEntity(name, type, lectureId);
            try {
                File destFile = new File(projectPath + File.separator + name);
                log.info("path {}", destFile);
                file.transferTo(destFile);
                fileRepository.save(fileEntity);
                lecture.setFiles(true);
                lectureRepository.save(lecture);
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

    public boolean deleteFile(FileEntity fileEntity) {
        File file = new File(fileEntity.getPath());
        if(file.delete()){
            fileRepository.delete(fileEntity);
            return true;
        }
        return false;
    }

    public Path download(Long fileId) {
        var fileEntity = fileRepository.findById(fileId);
        return fileEntity.map(entity -> Paths.get(fileEntity.get().getDir()  + File.separator + entity.getName())).orElse(null);
    }

    public List<FileEntity> getLecture(Long lectureId){
        return fileRepository.findAllByLectureId(lectureId);
    }

}
