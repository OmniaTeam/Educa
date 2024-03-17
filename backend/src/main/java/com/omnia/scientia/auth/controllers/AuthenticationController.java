package com.omnia.scientia.auth.controllers;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.omnia.scientia.auth.config.JWTService;
import com.omnia.scientia.auth.entites.ERole;
import com.omnia.scientia.auth.repositories.UserRepository;
import com.omnia.scientia.dto.*;
import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.auth.services.UserService;
import com.omnia.scientia.exceptions.AlreadyExistException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.view.RedirectView;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.util.Optional;

@RestController
@RequestMapping("/user")
@RequiredArgsConstructor
@Slf4j
public class AuthenticationController {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;
    private final UserRepository userRepository;
    private final JWTService jwtService;

    @GetMapping("/vk")
    public void vkRegister(@RequestParam String payload, HttpServletResponse response, HttpServletRequest request) throws IOException {
        ObjectMapper objectMapper = new ObjectMapper();

        try {
            log.info("payload {}", payload);
            JsonNode jsonNode = objectMapper.readTree(payload);

            Long userId = jsonNode.get("user").get("id").asLong();
            Optional<UserEntity> user = userRepository.findByVkId(userId);
            if (user.isEmpty()) {
                String fio = jsonNode.get("user").get("first_name").asText()
                        + " "
                        + jsonNode.get("user").get("last_name").asText();
                UserEntity userSaver = new UserEntity();
                userSaver.setFio(fio);
                userSaver.setVkId(userId);
                userSaver.setRole(ERole.Guest);
                userRepository.save(userSaver);
                new DefaultRedirectStrategy().sendRedirect(request, response, "/moderation");
                return;
            }

            if (user.get().getRole() == ERole.Guest) {
                new DefaultRedirectStrategy().sendRedirect(request, response, "/moderation");
                return;
            }

            Cookie accessTokenCookie = jwtService.createAccessTokenCookie(user.get());
            Cookie refrashTokenCookie = jwtService.createRefrashTokenCookie(user.get());
            response.addCookie(accessTokenCookie);
            response.addCookie(refrashTokenCookie);
            new DefaultRedirectStrategy().sendRedirect(request, response, "/auth");
        } catch (Exception e) {
            log.error("error", e);
            new DefaultRedirectStrategy().sendRedirect(request, response, "/auth");
        }

    }

    @GetMapping("/add/vk")
    public ResponseEntity<?> addVk(HttpServletRequest request, HttpServletResponse response,@RequestParam String payload, Authentication authentication) throws IOException {
        UserEntity user = (UserEntity) authentication.getPrincipal();

        ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(payload);
        Long userId = jsonNode.get("user").get("id").asLong();
        Optional<UserEntity> userEnt = userRepository.findByVkId(userId);
        if (userEnt.isPresent()) throw new AlreadyExistException("user");
        user.setVkId(userId);
        userRepository.save(user);
        new DefaultRedirectStrategy().sendRedirect(request, response, "/application");
        return ResponseEntity.ok().build();
    }


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
