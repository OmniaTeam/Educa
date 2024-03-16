package com.omnia.scientia.files.entity;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FileRepository extends JpaRepository<FileEntity, Long> {

    List<FileEntity> findAllByLectureId(Long lectureId);

    List<FileEntity> findAllByProcessedFalse();

}
