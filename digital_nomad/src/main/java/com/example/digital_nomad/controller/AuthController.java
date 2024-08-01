package com.example.digital_nomad.controller;


import com.example.digital_nomad.model.User;
import com.example.digital_nomad.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

import lombok.Data;


@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        try {
            User user = userService.registerUser(signUpRequest.getEmail(), signUpRequest.getPassword());

            return ResponseEntity.ok(createSuccessResponse("User registered successfully"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            User user = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());
            return ResponseEntity.ok(createSuccessResponse("Login successful"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(createErrorResponse(e.getMessage()));
        }
    }

    private Map<String, String> createErrorResponse(String errorMessage) {
        Map<String, String> errorResponse = new HashMap<>();
        errorResponse.put("error", errorMessage);
        return errorResponse;
    }

    private Map<String, String> createSuccessResponse(String message) {
        Map<String, String> successResponse = new HashMap<>();
        successResponse.put("message", message);
        return successResponse;
    }
}

@Data
class SignUpRequest {
    private String email;
    private String password;
}

@Data
class LoginRequest {
    private String email;
    private String password;
}