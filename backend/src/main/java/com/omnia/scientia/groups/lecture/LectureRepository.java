package com.omnia.scientia.groups.lecture;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LectureRepository extends JpaRepository<LectureEntity, Long> {

    List<LectureEntity> findAllBySubjectId(Long subjectId);
}
