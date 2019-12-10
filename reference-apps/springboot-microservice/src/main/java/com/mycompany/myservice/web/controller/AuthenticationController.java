package com.mycompany.myservice.web.controller;

import com.mycompany.myservice.config.ApplicationProperties;
import com.mycompany.myservice.config.security.CustomUserDetailsService;
import com.mycompany.myservice.config.security.SecurityUser;
import com.mycompany.myservice.config.security.SecurityUtils;
import com.mycompany.myservice.config.security.TokenHelper;
import com.mycompany.myservice.entity.User;
import com.mycompany.myservice.model.AuthenticationRequest;
import com.mycompany.myservice.model.AuthenticationResponse;
import com.mycompany.myservice.model.ChangePasswordRequest;
import com.mycompany.myservice.model.UserDTO;
import com.mycompany.myservice.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Slf4j
public class AuthenticationController {
    private final AuthenticationManager authenticationManager;
    private final CustomUserDetailsService userDetailsService;
    private final TokenHelper tokenHelper;
    private final UserService userService;
    private final ApplicationProperties applicationProperties;

    public AuthenticationController(AuthenticationManager authenticationManager,
                                    CustomUserDetailsService userDetailsService,
                                    TokenHelper tokenHelper,
                                    UserService userService, ApplicationProperties applicationProperties) {
        this.authenticationManager = authenticationManager;
        this.userDetailsService = userDetailsService;
        this.tokenHelper = tokenHelper;
        this.userService = userService;
        this.applicationProperties = applicationProperties;
    }

    @PostMapping(value = "/login")
    public AuthenticationResponse createAuthenticationToken(@RequestBody AuthenticationRequest credentials) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(credentials.getUsername(), credentials.getPassword())
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        SecurityUser user = (SecurityUser) authentication.getPrincipal();
        String jws = tokenHelper.generateToken(user.getUsername());
        return new AuthenticationResponse(jws, applicationProperties.getJwt().getExpiresIn());
    }

    @PostMapping(value = "/refresh")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<AuthenticationResponse> refreshAuthenticationToken(HttpServletRequest request) {
        String authToken = tokenHelper.getToken(request);
        if (authToken != null) {
            String email = tokenHelper.getUsernameFromToken(authToken);
            UserDetails userDetails = userDetailsService.loadUserByUsername(email);
            Boolean validToken = tokenHelper.validateToken(authToken, userDetails);
            if (validToken) {
                String refreshedToken = tokenHelper.refreshToken(authToken);
                return ResponseEntity.ok(
                        new AuthenticationResponse(
                                refreshedToken,
                                applicationProperties.getJwt().getExpiresIn()
                        )
                );
            } else {
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
            }
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @GetMapping("/me")
    @PreAuthorize("hasRole('ROLE_USER')")
    public ResponseEntity<UserDTO> me() {
        User loginUser = SecurityUtils.loginUser();
        if(loginUser != null) {
            return ResponseEntity.ok(UserDTO.fromEntity(loginUser));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

    @PostMapping("/change-password")
    @PreAuthorize("hasRole('ROLE_USER')")
    public void changePassword(@RequestBody @Valid ChangePasswordRequest changePasswordRequest) {
        Authentication currentUser = SecurityContextHolder.getContext().getAuthentication();
        String email = currentUser.getName();
        log.info("process=change_password, email=$email");
        userService.changePassword(email, changePasswordRequest);
    }
}
