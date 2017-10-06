package com.example.tas.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tas.model.PeriodCourse;
import com.example.tas.repository.PeriodCourseRepo;

import net.minidev.json.JSONObject;

@RestController
public class DashboardController extends ApiController<PeriodCourse>{

	@Autowired
	private PeriodCourseRepo periodCourseRepo;
	
	@PostMapping(value="/dashboard/active")
	public ResponseEntity<JSONObject> getActiveTraining() {
		JSONObject response = new JSONObject();

		List<PeriodCourse> data = periodCourseRepo.findAll(ActiveTraining());
		response.put("data", data);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/dashboard/bcc")
	public ResponseEntity<JSONObject> getBcc() {
		JSONObject response = new JSONObject();
		List<PeriodCourse> data = periodCourseRepo.findAll(ActiveBcc());
		response.put("data", data);
		return ResponseEntity.ok(response);
	}
}
