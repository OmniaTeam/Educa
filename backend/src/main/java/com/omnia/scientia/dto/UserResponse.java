package com.omnia.scientia.dto;


import com.omnia.scientia.auth.entites.ERole;
import com.omnia.scientia.auth.entites.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserResponse {
    Long id;
    String fio;
    String login;
    ERole role;

    public UserResponse(UserEntity user) {
        this.id = user.getId();
        this.fio = user.getFio();
        this.login = user.getLogin();
        this.role = user.getRole();
    }
}
