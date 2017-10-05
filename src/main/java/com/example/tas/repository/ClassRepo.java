package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.Class;

public interface ClassRepo extends JpaRepository<Class, Long>,JpaSpecificationExecutor<Class> {

}
