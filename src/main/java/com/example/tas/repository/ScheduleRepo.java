package com.example.tas.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.example.tas.model.Schedule;

public interface ScheduleRepo extends JpaRepository<Schedule, Long>,JpaSpecificationExecutor<Schedule> {

}
