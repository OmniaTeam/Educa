package com.omnia.scientia.groups.subject;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SubjectRepository extends JpaRepository<SubjectEntity,Long> {

    List<SubjectEntity> findAllByDirectionId(Long directionId);

    List<SubjectEntity> findAllByTeacherId(Long teacherId);

}
