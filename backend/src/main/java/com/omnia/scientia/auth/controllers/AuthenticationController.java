package com.omnia.scientia.auth.controllers;


import com.omnia.scientia.auth.config.JWTService;
import com.omnia.scientia.dto.UserChangePassword;
import com.omnia.scientia.dto.UserLogin;
import com.omnia.scientia.dto.UserResponse;
import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.auth.services.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final JWTService jwtService;


    @GetMapping
    public ResponseEntity<UserResponse> authenticationToken(Authentication authentication) {
        UserEntity user = (UserEntity) authentication.getPrincipal();
        return ResponseEntity.ok(new UserResponse(user));
    }

    @PostMapping
    public ResponseEntity<UserResponse> authentication(HttpServletResponse response, @RequestBody UserLogin signIn) {
        try {
            Authentication auth = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(
                    signIn.getLogin(),
                    signIn.getPassword()
            ));
            UserEntity user = (UserEntity) auth.getPrincipal();
            Cookie accessCookie = jwtService.createAccessTokenCookie(user);
            Cookie refreshCookie = jwtService.createRefrashTokenCookie(user);
            response.addCookie(accessCookie);
            response.addCookie(refreshCookie);
            return ResponseEntity.ok(new UserResponse(user));
        } catch (UsernameNotFoundException ex) {
            System.out.println(ex.getMessage());
            return ResponseEntity.status(404).build();
        }

    }

    @GetMapping("/refresh_tokens")
    public ResponseEntity<?> refreshTokens(@CookieValue(value = "refresh_token") String token, HttpServletResponse response) {
        Long userId = jwtService.userIdFromRefreshToken(token);
        UserEntity user = userService.getUserById(userId);
        Cookie accessCookie = jwtService.createAccessTokenCookie(user);
        Cookie refreshCookie = jwtService.createRefrashTokenCookie(user);
        response.addCookie(accessCookie);
        response.addCookie(refreshCookie);
        return ResponseEntity.ok().build();
    }


    @GetMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        response.addCookie(jwtService.resetAccessCookie());
        response.addCookie(jwtService.resetRefreshCookie());
        return ResponseEntity.ok().build();
    }


    @PostMapping("/change_password")
    public ResponseEntity<?> changePassword(@RequestBody UserChangePassword password) {
        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        userService.changePassword(user, password);
        return ResponseEntity.ok().build();
    }

//    @PatchMapping("/update_profile")
//    ResponseEntity<?> updateProfile(@RequestBody UserUpdate userUpdate) {
//        UserEntity user = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//        user.setGender(userUpdate.getGender());
//        user.setFio(userUpdate.getFio());
//        user.setDate(userUpdate.getDate());
//        userService.saveUser(user);
//        return ResponseEntity.ok().build();
//    }
}
