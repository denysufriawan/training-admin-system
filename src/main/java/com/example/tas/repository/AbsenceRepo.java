package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.Absence;

public interface AbsenceRepo extends JpaRepository<Absence, Long>,JpaSpecificationExecutor<Absence>{

}
