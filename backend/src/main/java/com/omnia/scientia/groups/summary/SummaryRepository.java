package com.omnia.scientia.groups.summary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SummaryRepository extends JpaRepository<SummaryEntity, Long> {

    List<SummaryEntity> findAllByLectureId(Long lectureId);
}
