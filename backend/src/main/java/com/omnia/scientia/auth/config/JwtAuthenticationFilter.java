package com.omnia.scientia.auth.config;


import com.omnia.scientia.auth.entites.UserEntity;
import com.omnia.scientia.auth.repositories.UserRepository;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Optional;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTService jwtService;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(JWTService jwtService, UserRepository userRepository) {
        this.jwtService = jwtService;
        this.userRepository = userRepository;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Optional<Cookie> cookie = jwtService.getCookieByRequest(request, JWTService.ACCESS_TOKEN);
        if (cookie.isEmpty() || cookie.get().getName().isEmpty()) {
            filterChain.doFilter(request, response);
            return;
        }

        String jwt = cookie.get().getValue();
        if (jwtService.isTokenValid(jwt)) {
            Long userId = jwtService.extractId(jwt);
            Optional<UserEntity> userOpt = userRepository.findById(userId);
            if (userOpt.isPresent())
            {
                UserEntity user = userOpt.get();
                SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
                UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(
                        user, null, user.getAuthorities()
                );
                token.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                securityContext.setAuthentication(token);
                SecurityContextHolder.setContext(securityContext);
            }

        }

        filterChain.doFilter(request, response);

    }
}