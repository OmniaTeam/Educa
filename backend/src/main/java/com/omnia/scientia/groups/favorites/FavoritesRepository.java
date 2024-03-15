package com.omnia.scientia.groups.favorites;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritesRepository extends JpaRepository<FavoritesEntity, Long> {

    List<FavoritesEntity> findAllByUserId(Long userId);
    Optional<FavoritesEntity> findByTypeAndObjectIdAndUserId(String type, Long objectId, Long userId);

}
