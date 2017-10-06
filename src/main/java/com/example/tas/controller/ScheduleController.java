package com.example.tas.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.Column;
import org.springframework.data.jpa.datatables.mapping.Search;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tas.model.Schedule;
import com.example.tas.repository.ScheduleRepo;
import net.minidev.json.JSONObject;

@RestController
public class ScheduleController extends ApiController<Schedule>{

	@Autowired
	private ScheduleRepo scheduleRepo;
		
	@PostMapping(value="/attendance/list/{id}")
	public ResponseEntity<JSONObject> getAttendanceList(@PathVariable String id) {
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
		List<Schedule> data = scheduleRepo.findAll(DataTable(columns));
		response.put("data", data);
		return ResponseEntity.ok(response);
	}
}
