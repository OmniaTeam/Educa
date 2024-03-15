package com.omnia.scientia.dto;

import com.omnia.scientia.auth.entites.ERole;
import lombok.Data;

@Data
public class UserCreate {
    String login;
    String password;
    String fio;
    ERole role;
}


