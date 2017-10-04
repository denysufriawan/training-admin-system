package com.example.tas.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.tas.model.Grade;
import com.example.tas.model.JobStream;
import com.example.tas.model.Role;
import com.example.tas.repository.CourseRepo;
import com.example.tas.repository.GradeRepo;
import com.example.tas.repository.JobFamilyRepo;
import com.example.tas.repository.JobStreamRepo;
import com.example.tas.repository.RoleRepo;
import net.minidev.json.JSONObject;

@RestController
public class DropdownController extends ApiController<Role> {

	@Autowired
	private RoleRepo roleRepo;
	@Autowired
	private JobFamilyRepo joFamilyRepo;
	@Autowired
	private JobStreamRepo jobStreamRepo;
	@Autowired
	private GradeRepo gradeRepo;
	@Autowired
	private CourseRepo courseRepo;
	
	@GetMapping(value="/role/list")
	public ResponseEntity<JSONObject> getRoleList() {
		JSONObject response = new JSONObject();
		response.put("message", roleRepo.findAll());
		return ResponseEntity.ok(response);
	}
	
	@GetMapping(value="/jobFamily/list")
	public ResponseEntity<JSONObject> getJobFamily() {
		JSONObject response = new JSONObject();
		response.put("message", joFamilyRepo.findAll());
		return ResponseEntity.ok(response);
	}
	
	@GetMapping(value="/placement/list")
	public ResponseEntity<JSONObject> getPlacement() {
		JSONObject response = new JSONObject();
		response.put("message", courseRepo.findByCourseGroup("BCC"));
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/jobStream/list")
	public ResponseEntity<JSONObject> getJobStream(@RequestBody final JSONObject id) {
		JSONObject response = new JSONObject();
		List<JobStream> jobStream = new ArrayList<>();
		if(id.getAsString("id")!="")
			jobStream=jobStreamRepo.findByJobFamily(joFamilyRepo.findOne(Long.valueOf(id.getAsString("id")).longValue()));
		response.put("message", jobStream);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/grade/list")
	public ResponseEntity<JSONObject> getGrade(@RequestBody final JSONObject id) {
		JSONObject response = new JSONObject();
		List<Grade> grade = new ArrayList<>();
		if(id.getAsString("id")!="")
			grade=gradeRepo.findByJobFamily(joFamilyRepo.findOne(Long.valueOf(id.getAsString("id")).longValue()));
		response.put("message", grade);
		return ResponseEntity.ok(response);
	}
}
