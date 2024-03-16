package com.omnia.scientia.groups.favorites;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
public class FavoritesEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String type;
    private Long objectId;
    private Long userId;

    public FavoritesEntity(String type, Long objectId, Long userId) {
        this.type = type;
        this.objectId = objectId;
        this.userId = userId;
    }

    public FavoritesEntity copy(FavoritesEntity obj){
        this.objectId=obj.getObjectId();
        this.type=obj.getType();
        this.userId=obj.getUserId();
        return this;
    }
}
