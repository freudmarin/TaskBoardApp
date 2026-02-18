package com.taskboard.controller;

import com.taskboard.security.CurrentUser;
import com.taskboard.security.UserPrincipal;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.stream.Collectors;

/**
 * REST Controller for user profile and authentication testing.
 */
@Slf4j
@RestController
@RequestMapping("/api/v1/users")
@CrossOrigin(origins = "*")
public class UserController {

    /**
     * Get current authenticated user's profile.
     *
     * @param currentUser the authenticated user
     * @return ResponseEntity with user profile
     */
    @GetMapping("/me")
    public ResponseEntity<UserProfileResponse> getCurrentUser(@CurrentUser UserPrincipal currentUser) {
        log.info("Fetching profile for user: {}", currentUser.getUsername());

        UserProfileResponse response = new UserProfileResponse(
                currentUser.getId(),
                currentUser.getUsername(),
                currentUser.getEmail(),
                currentUser.getAuthorities().stream()
                        .map(authority -> authority.getAuthority())
                        .collect(Collectors.toList())
        );

        return ResponseEntity.ok(response);
    }

    /**
     * Admin only endpoint for testing authorization.
     *
     * @param currentUser the authenticated user
     * @return ResponseEntity with admin message
     */
    @GetMapping("/admin")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<String> adminEndpoint(@CurrentUser UserPrincipal currentUser) {
        log.info("Admin endpoint accessed by: {}", currentUser.getUsername());
        return ResponseEntity.ok("Hello Admin: " + currentUser.getUsername());
    }

    /**
     * DTO for user profile response.
     */
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    private static class UserProfileResponse {
        private Long id;
        private String username;
        private String email;
        private java.util.List<String> roles;
    }
}

