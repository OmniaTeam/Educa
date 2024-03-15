package com.omnia.scientia.groups.direction;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DirectionRepository extends JpaRepository<DirectionEntity, Long> {
    List<DirectionEntity> findAllByDepartmentId(Long departmentId);
}
