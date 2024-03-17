package com.omnia.scientia.auth.entites;


import com.omnia.scientia.dto.UserCreate;
import com.omnia.scientia.files.entity.CSVregDTO;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
public class UserEntity implements UserDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Long vkId;
    private String fio;
    private String login;
    private String password;
    @Enumerated(EnumType.ORDINAL)
    private ERole role;

public UserEntity(UserCreate userCreate) {
    this.fio = userCreate.getFio();
    this.login = userCreate.getLogin();
    this.password = userCreate.getPassword();
    this.role = userCreate.getRole();
}

    public UserEntity(CSVregDTO csv) {
        this.fio = csv.getFio();
        this.login = csv.getLogin();
        this.password = csv.getPassword();
        this.role = csv.getRole();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return login;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}

