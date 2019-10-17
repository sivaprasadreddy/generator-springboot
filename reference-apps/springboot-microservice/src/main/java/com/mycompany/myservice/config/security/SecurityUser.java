package com.mycompany.myservice.config.security;

import com.mycompany.myservice.entity.User;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;

import java.util.Collection;
import java.util.stream.Collectors;

public class SecurityUser extends org.springframework.security.core.userdetails.User {
    private User user;
    public SecurityUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public SecurityUser(User user) {
        super(user.getEmail(), user.getPassword(),
                user.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.getName())).collect(Collectors.toList()));
        this.user = user;
    }

    public User getUser() {
        return user;
    }
}
