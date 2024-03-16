package com.omnia.scientia.groups.student;

import com.omnia.scientia.dto.StudentInfoResponse;
import com.omnia.scientia.dto.StudentSubjectResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<StudentEntity, Long> {
    Optional<StudentEntity> findByUserId(Long userId);

    @Query("SELECT new com.omnia.scientia.dto.StudentInfoResponse(st.id, u.fio, st.semesterNumber, i.name, dp.name, dr.name) " +
            "FROM UserEntity u " +
            "JOIN StudentEntity st ON st.userId=u.id "+
            "JOIN DirectionEntity dr ON dr.id=st.directionId " +
            "JOIN DepartmentEntity dp ON dp.id=dr.departmentId " +
            "JOIN InstituteEntity i ON i.id=dp.instituteId " +
            "WHERE u.id=:userId")
    StudentInfoResponse findStudentInfoByUserId(@Param("userId") Long userId);

    @Query("SELECT new com.omnia.scientia.dto.StudentInfoResponse(st.id, u.fio, st.semesterNumber, i.name, dp.name, dr.name) " +
            "FROM UserEntity u " +
            "JOIN StudentEntity st ON st.userId=u.id "+
            "JOIN DirectionEntity dr ON dr.id=st.directionId " +
            "JOIN DepartmentEntity dp ON dp.id=dr.departmentId " +
            "JOIN InstituteEntity i ON i.id=dp.instituteId " +
            "WHERE st.id=:studentId")
    StudentInfoResponse findStudentInfoByStudentId(@Param("studentId") Long userId);

    @Query("SELECT new com.omnia.scientia.dto.StudentSubjectResponse(sb.id, sb.name, sb.semester, sb.teacherId, sb.directionId, u.fio) " +
            "FROM StudentEntity st " +
            "JOIN DirectionEntity dr ON dr.id=st.directionId " +
            "JOIN SubjectEntity sb ON sb.directionId=dr.id " +
            "JOIN TeacherEntity t ON sb.teacherId=t.id " +
            "JOIN UserEntity u ON t.userId=u.id " +
            "WHERE st.id=:studentId and st.semesterNumber=sb.semester")
    List<StudentSubjectResponse> findAllStudentSubjectsByStudentId(@Param("studentId") Long studentId);

    List<StudentEntity> findAllByDirectionId(Long directionId);

}
