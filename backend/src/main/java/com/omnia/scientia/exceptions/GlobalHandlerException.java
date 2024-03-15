package com.omnia.scientia.exceptions;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.nio.file.AccessDeniedException;

@ControllerAdvice
public class GlobalHandlerException {
    @ExceptionHandler
    public ResponseEntity<?> userNotFoundException(NotFoundException ex) {
        return ResponseEntity.status(404).body(ex.getMessage() + " not found");
    }

    @ExceptionHandler
    public ResponseEntity<?> alreadyExistException(AlreadyExistException ex) {
        return ResponseEntity.status(409).body(ex.getMessage() + " already exist");
    }

    @ExceptionHandler
    public ResponseEntity<?> accessDenied(AccessDeniedException ex) {
        return ResponseEntity.status(403).body(ex.getMessage());
    }
}
