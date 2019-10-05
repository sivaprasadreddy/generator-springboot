package com.mycompany.myservice.repository;

import com.mycompany.myservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}
