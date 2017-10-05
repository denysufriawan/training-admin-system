package com.example.tas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.UserRole;

public interface UserRoleRepo extends JpaRepository<UserRole, Long>,JpaSpecificationExecutor<UserRole> {
	List<UserRole> findByIdRole(Long id);
}



