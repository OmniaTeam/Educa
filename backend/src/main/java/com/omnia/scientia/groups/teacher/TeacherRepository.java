package com.omnia.scientia.groups.teacher;

import com.omnia.scientia.dto.TeacherInfoResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TeacherRepository extends JpaRepository<TeacherEntity, Long> {
    @Query("SELECT new com.omnia.scientia.dto.TeacherInfoResponse(t.id, u.fio, i.name, dp.name, t.position) " +
            "FROM UserEntity u " +
            "JOIN TeacherEntity t ON t.userId=u.id "+
            "JOIN DepartmentEntity dp ON dp.id=t.departmentId " +
            "JOIN InstituteEntity i ON i.id=dp.instituteId " +
            "WHERE u.id=:userId")
    TeacherInfoResponse findTeacherInfoByUserId(@Param("userId") Long userId);


    @Query("SELECT new com.omnia.scientia.dto.TeacherInfoResponse(t.id, u.fio, i.name, dp.name, t.position) " +
            "FROM UserEntity u " +
            "JOIN TeacherEntity t ON t.userId=u.id "+
            "JOIN DepartmentEntity dp ON dp.id=t.departmentId " +
            "JOIN InstituteEntity i ON i.id=dp.instituteId " +
            "WHERE t.id=:teacherId")
    TeacherInfoResponse findTeacherInfoByTeacherId(@Param("teacherId") Long userId);

    List<TeacherEntity> findAllByDepartmentId(Long departmentId);

    Optional<TeacherEntity> findByUserId(Long userId);
}
