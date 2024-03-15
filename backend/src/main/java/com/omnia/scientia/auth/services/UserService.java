package com.omnia.scientia.auth.services;


import com.omnia.scientia.dto.UserChangePassword;
import com.omnia.scientia.dto.UserCreate;
import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.exceptions.AlreadyExistException;
import com.omnia.scientia.exceptions.NotFoundException;
import com.omnia.scientia.auth.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    public UserEntity getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public UserEntity getUserByLogin(String login) {
        return userRepository.findByLogin(login).orElseThrow(() -> new NotFoundException("User"));
    }

    public UserEntity userRegister(UserCreate userCreate) {
        Optional<UserEntity> userDB = userRepository.findByLogin(userCreate.getLogin());
        if (userDB.isPresent()) {

                String errorMsg = String.format("%s %s",
                        "Пользователь с login:",
                        userCreate.getLogin()
                );

                throw new AlreadyExistException(errorMsg);

        }
        userCreate.setPassword(passwordEncoder.encode(userCreate.getPassword()));
        UserEntity user = new UserEntity(userCreate);
        userRepository.save(user);
        return user;
    }

    public void saveUser(UserEntity user) {
        userRepository.save(user);
    }

    public UserDetailsService userDetailsService() {
        return username -> userRepository.findByLogin(username).
                orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public void changePassword(UserEntity user, UserChangePassword password) {
        if (passwordEncoder.matches(password.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(password.getNewPassword()));
            userRepository.save(user);
        }
        else {
            throw new AccessDeniedException("Access is denied");
        }
    }

    public void deleteUser(Long userId) {
        UserEntity user = getUserById(userId);
        userRepository.delete(user);
    }

}
