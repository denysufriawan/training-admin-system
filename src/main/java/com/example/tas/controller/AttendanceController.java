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

import com.example.tas.model.Attendance;
import com.example.tas.repository.AbsenceRepo;
import com.example.tas.repository.AttendanceRepo;
import com.example.tas.repository.UserRepo;

import net.minidev.json.JSONObject;

@RestController
public class AttendanceController extends ApiController<Attendance>{

	@Autowired
	private AttendanceRepo attendanceRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private AbsenceRepo absenceRepo;
	
	@PostMapping(value="/attendance-user/list/{id}")
	public ResponseEntity<JSONObject> getAttendanceUserList(@PathVariable String id) {
		JSONObject response = new JSONObject();
		List<Column> columns = new ArrayList<>();
		List<Column> columnsCount = new ArrayList<>();
		Column c = new Column();
		Search s = new Search();
		
		s.setValue(id);
		c.setData("courseSchedule.idCourseSchedule");
		c.setSearch(s);
		
		columns.add(c);
		columnsCount.add(c);
		List<Attendance> data = attendanceRepo.findAll(DataTable(columns));
		data.forEach(m -> {
			Long idUser = m.getUserCourse().getIdUser();
			m.getUserCourse().user=userRepo.findOne(idUser);
		});
		response.put("data", data);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/attendance-user/edit")
	public ResponseEntity<JSONObject> editAttendanceUser(@RequestBody Attendance post) {
		JSONObject response = new JSONObject();
		List<String> absence = post.idAbsenceInput;
		List<Attendance> save = attendanceRepo.findAll(AttendanceEdit(post.idAttendanceInput));
		
		int i=0;
		for (Attendance attendance : save) {
			attendance.setAbsence(absenceRepo.findOne(Long.valueOf(absence.get(i)).longValue()));
			i++;
		}
		
		if(attendanceRepo.save(save)!=null) 
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
