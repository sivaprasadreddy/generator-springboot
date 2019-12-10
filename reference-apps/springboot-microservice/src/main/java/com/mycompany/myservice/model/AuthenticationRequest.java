package com.mycompany.myservice.model;

import lombok.Data;

import javax.validation.constraints.NotBlank;

@Data
public class AuthenticationRequest {
    @NotBlank(message = "UserName cannot be blank")
    private String username;

    @NotBlank(message = "Password cannot be blank")
    private String password;
}
