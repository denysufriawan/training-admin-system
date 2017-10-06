package com.example.tas.controller;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.Column;
import org.springframework.data.jpa.datatables.mapping.Search;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.tas.model.UserCourse;
import com.example.tas.repository.UserCourseRepo;
import com.example.tas.repository.UserRepo;

import net.minidev.json.JSONObject;

@RestController
public class AssessmentController extends ApiController<UserCourse>{

	@Autowired
	private UserCourseRepo assessmentRepo;
	
	@Autowired
	private UserRepo userRepo;
		
	@PostMapping(value="/assessment/list/{id}")
	public ResponseEntity<JSONObject> getAssessmentList(@PathVariable String id) {
		JSONObject response = new JSONObject();
		List<Column> columns = new ArrayList<>();
		List<Column> columnsCount = new ArrayList<>();
		Column c = new Column();
		Search s = new Search();
		
		s.setValue(id);
		c.setData("periodCourse.idPeriodCourse");
		c.setSearch(s);
		
		columns.add(c);
		columnsCount.add(c);
		List<UserCourse> data = assessmentRepo.findAll(DataTable(columns));
		data.forEach(m -> {
			Long idUser = m.getIdUser();
			m.user=userRepo.findOne(idUser);
		});
		response.put("data", data);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/assessment/edit")
	public ResponseEntity<JSONObject> editAssessment(@RequestBody UserCourse post) {
		JSONObject response = new JSONObject();
		
		List<String> pass = post.passInput;
		List<UserCourse> save = assessmentRepo.findAll(AssessmentEdit(post.idUserCourseInput));
		
		int i=0;
		for (UserCourse userCourse : save) {
			userCourse.setPass(pass.get(i));
			i++;
		}
		
		if(assessmentRepo.save(save)!=null) 
		{
			response.put("status", "1");
			response.put("message", "Data added successfully!");
		} 
		else 
		{
			response.put("status", "2");
			response.put("message", "Failed to save data!");
		}
		return ResponseEntity.ok(response);
	} 
}
