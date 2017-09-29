package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.Eligible;

public interface EligibleRepo extends JpaRepository<Eligible, Long>,JpaSpecificationExecutor<Eligible>{

}
