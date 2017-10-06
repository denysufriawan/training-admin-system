package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.User;

public interface UserRepo extends JpaRepository<User, Long>,JpaSpecificationExecutor<User>{
	User findByUsernameIgnoreCase(String username);
}