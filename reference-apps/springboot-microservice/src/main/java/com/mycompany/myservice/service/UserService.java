package com.mycompany.myservice.service;

import com.mycompany.myservice.entity.User;
import com.mycompany.myservice.model.ChangePasswordRequest;
import com.mycompany.myservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public List<User> findAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public User saveUser(User user) {
        return userRepository.save(user);
    }

    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }

    public void changePassword(String email, ChangePasswordRequest changePasswordRequest) {
        Optional<User> userByEmail = userRepository.findByEmail(email);
        if(!userByEmail.isPresent()) {
            throw new RuntimeException("User with email $email not found");
        }
        User user = userByEmail.get();
        if (passwordEncoder.matches(changePasswordRequest.getOldPassword(), user.getPassword())) {
            user.setPassword(passwordEncoder.encode(changePasswordRequest.getNewPassword()));
            userRepository.save(user);
        } else {
            throw new RuntimeException("Current password doesn't match");
        }
    }
}
