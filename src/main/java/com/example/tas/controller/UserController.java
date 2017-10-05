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
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.tas.model.Role;
import com.example.tas.model.User;
import com.example.tas.repository.CourseRepo;
import com.example.tas.repository.GradeRepo;
import com.example.tas.repository.JobStreamRepo;
import com.example.tas.repository.RoleRepo;
import com.example.tas.repository.UserRepo;

import net.minidev.json.JSONObject;

@RestController
public class UserController extends ApiController<User>{
		
	@Autowired
	private UserRepo userRepo;
	@Autowired
	private CourseRepo courseRepo;
	@Autowired
	private RoleRepo roleRepo;
	@Autowired
	private JobStreamRepo jobStreamRepo;
	@Autowired
	private GradeRepo gradeRepo;
	
	
	@PostMapping(value="/user/list")
	public ResponseEntity<JSONObject> getUserList(@Valid @RequestBody DataTablesInput input) {
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

		s.setValue("0");
		c.setData("deleted");
		c.setSearch(s);
		columns.add(c);
		columnsCount.add(c);
		Sort sorts = new Sort(orders);
		PageRequest page = new PageRequest((int)Math.ceil(input.getStart()/input.getLength()),input.getLength(),sorts);
		Page<User> data = userRepo.findAll(DataTableUser(columns), page);
		response.put("draw", input.getDraw());
		response.put("recordsTotal", userRepo.findAll(CountDataTableUser(columnsCount)).size());
		response.put("recordsFiltered", data.getTotalElements());
		response.put("data", data.getContent());
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/user/add")
	public ResponseEntity<JSONObject> addUser(@RequestBody final User post) {
		JSONObject response = new JSONObject();
		List<Role> role = new ArrayList<>();
		
		for (String item : post.rolelist) {
			role.add(roleRepo.findOne(Long.valueOf(item).longValue()));
		}

		post.setGrade(gradeRepo.findOne(Long.valueOf(post.idGrade).longValue()));
		post.setJobStream(jobStreamRepo.findOne(Long.valueOf(post.idJobStream).longValue()));
		post.setRole(role);
		if(userRepo.save(post)!=null) 
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
	
	@PostMapping(value="/user/edit")
	public ResponseEntity<JSONObject> editUser(@RequestBody final JSONObject post) {
		JSONObject response = new JSONObject();
		User user = userRepo.findOne(Long.valueOf(post.getAsString("id")).longValue());
		
		if(user!=null) 
		{
			response.put("status", "1");
			response.put("message", user);
			response.put("placement", courseRepo.findByIdCourseAndCourseGroup(Long.valueOf(user.getPlacementTest()).longValue(), "BCC").getCourseName());
		} 
		else 
		{
			response.put("status", "2");
			response.put("message", "Data not found!");
		}
		
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/user/edit_process")
	public ResponseEntity<JSONObject> editProcessUser(@RequestBody final User post) {
		JSONObject response = new JSONObject();		
		User u = userRepo.findOne(post.getIdUser());
		List<Role> role = new ArrayList<>();
		
		for (String item : post.rolelist) {
			role.add(roleRepo.findOne(Long.valueOf(item).longValue()));
		}
		u.setRole(role);
		u.setActive(post.getActive());
		if(userRepo.save(u)!=null) 
		{
			response.put("status", "1");
			response.put("message", "Data updated successfully!");
		} 
		else 
		{
			response.put("status", "2");
			response.put("message", "Failed to update data!");
		}
		
		return ResponseEntity.ok(response);
	}
}
