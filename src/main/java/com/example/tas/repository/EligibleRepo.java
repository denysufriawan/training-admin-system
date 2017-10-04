package com.example.tas.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.Eligible;

public interface EligibleRepo extends JpaRepository<Eligible, Long>,JpaSpecificationExecutor<Eligible>{
	List<Eligible> findByidPeriod(Long id);
	
	Eligible findByIdPeriodAndIdUser(Long idPeriod, Long idUser);
}
