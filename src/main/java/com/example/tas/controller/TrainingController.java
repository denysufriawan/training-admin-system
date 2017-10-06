package com.example.tas.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.jpa.datatables.mapping.Column;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.Search;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.tas.model.PeriodCourse;
import com.example.tas.model.User;
import com.example.tas.repository.PeriodCourseRepo;
import com.example.tas.repository.UserRepo;

import net.minidev.json.JSONObject;

@RestController
public class TrainingController extends ApiController<PeriodCourse>{

	@Autowired
	private PeriodCourseRepo periodCourseRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@PostMapping(value="/training/list/{id}/{idRole}")
	public ResponseEntity<JSONObject> getTrainingList(@Valid @RequestBody DataTablesInput input,@PathVariable Long id,@PathVariable Long idRole) {
		JSONObject response = new JSONObject();
		List<Sort.Order> orders = new ArrayList<>();
		List<Column> columns = input.getColumns();
		List<Column> columnsCount = new ArrayList<>();
		Column c = new Column();
		Search s = new Search();
		
		for (org.springframework.data.jpa.datatables.mapping.Order item : input.getOrder()) {
			String columnName = columns.get(item.getColumn()).getData();
			if(item.getDir().equals("asc"))
				orders.add(new Sort.Order(Direction.ASC, columnName));
			else
				orders.add(new Sort.Order(Direction.DESC, columnName));
		}
		
		if(idRole==2)
		{
			Column c1 = new Column();
			Search s1 = new Search();
			User u = userRepo.findOne(id);
			
			s1.setValue(Long.toString(u.getIdUser()));
			c1.setData("trainerMain.idUser");
			c1.setSearch(s1);
			columns.add(c1);
			columnsCount.add(c1);
		}
		s.setValue("0");
		c.setData("deleted");
		c.setSearch(s);
		
		columns.add(c);
		columnsCount.add(c);
		Sort sorts = new Sort(orders);
		PageRequest page = new PageRequest((int)Math.ceil(input.getStart()/input.getLength()),input.getLength(),sorts);
		Page<PeriodCourse> data = periodCourseRepo.findAll(DataTable(columns), page);
		response.put("draw", input.getDraw());
		response.put("recordsTotal", periodCourseRepo.findAll(CountDataTable(columnsCount)).size());
		response.put("recordsFiltered", data.getTotalElements());
		response.put("data", data.getContent());
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/training/getDetail")
	public ResponseEntity<JSONObject> getAssessmentList(@RequestBody JSONObject post) {
		JSONObject response = new JSONObject();
		PeriodCourse training = periodCourseRepo.findOne(Long.valueOf(post.getAsString("id")).longValue());
		
		if(training!=null) 
		{
			response.put("status", "1");
			response.put("message", training);
		} 
		else 
		{
			response.put("status", "2");
			response.put("message", "Data not found!");
		}
		return ResponseEntity.ok(response);
	}
}
