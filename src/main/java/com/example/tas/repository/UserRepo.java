package com.example.tas.repository;

import org.springframework.data.jpa.datatables.repository.DataTablesRepository;
import com.example.tas.model.User;

public interface UserRepo extends DataTablesRepository<User, Long>{
	User findByUsernameIgnoreCase(String username);
}
