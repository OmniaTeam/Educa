package com.omnia.scientia.auth.repositories;

import com.omnia.scientia.auth.entites.ERole;
import com.omnia.scientia.auth.entites.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByLogin(String login);
    List<UserEntity> findAllByRoleIsNull();
    List<UserEntity> findAllByRoleNull();
    Optional<UserEntity> findByVkId(Long vkId);

    List<UserEntity> findAllByRole(ERole eRole);
}
