package com.example.tas.repository;

import org.springframework.data.jpa.datatables.repository.DataTablesRepository;

import com.example.tas.model.Period;

public interface PeriodRepo extends DataTablesRepository<Period, Long>{
	
}
