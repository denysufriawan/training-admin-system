package com.example.tas.controller;

import java.util.ArrayList;
import java.util.List;

import javax.validation.Valid;

import org.apache.commons.lang3.StringUtils;
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

import com.example.tas.model.Eligible;
import com.example.tas.model.User;
import com.example.tas.repository.EligibleRepo;
import com.example.tas.repository.UserRepo;

import net.minidev.json.JSONObject;

@RestController
public class EligibleController extends ApiController<User> {

	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private EligibleRepo eligibleRepo;
	
	@PostMapping(value="/eligible/list/{id}")
	public ResponseEntity<JSONObject> getEligibleList(@Valid @RequestBody DataTablesInput input, @PathVariable String id) {
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
		
		if(!input.getSearch().getValue().equals(""))
		{
			Column tbc = new Column();
			Search tbs = new Search();
			tbs.setValue(input.getSearch().getValue());
			tbc.setData("name");
			tbc.setSearch(tbs);
			columns.add(tbc);
		}
		s.setValue(id);
		c.setData("period.idPeriod");
		c.setSearch(s);
		columns.add(c);
		columnsCount.add(c);
		Sort sorts = new Sort(orders);
		PageRequest page = new PageRequest((int)Math.ceil(input.getStart()/input.getLength()),input.getLength(),sorts);
		
		Page<User> data = userRepo.findAll(DataTable(columns), page);
		response.put("draw", input.getDraw());
		response.put("recordsTotal", userRepo.findAll(CountDataTable(columnsCount)).size());
		response.put("recordsFiltered", data.getTotalElements());
		response.put("data", data.getContent());
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/eligible/list/add/{id}")
	public ResponseEntity<JSONObject> getAddEligibleList(@PathVariable Long id) {
		JSONObject response = new JSONObject();
//		List<Sort.Order> orders = new ArrayList<>();
		List<Column> columns = new ArrayList<>();
		List<Column> columnsCount = new ArrayList<>();
		Column c = new Column();
		Search s = new Search();
//		
//		for (org.springframework.data.jpa.datatables.mapping.Order item : input.getOrder()) {
//			String columnName = columns.get(item.getColumn()).getData();
//			if(item.getDir().equals("asc"))
//				orders.add(new Sort.Order(Direction.ASC, columnName));
//			else
//				orders.add(new Sort.Order(Direction.DESC, columnName));
//		}
//		Sort sorts = new Sort(orders);
//		PageRequest page = new PageRequest((int)Math.ceil(input.getStart()/input.getLength()),input.getLength(),sorts);
		
		List<Eligible> dataIn = eligibleRepo.findByidPeriod(id);
		List<Long> notIn= new ArrayList<>();
		dataIn.forEach(m -> {
			notIn.add(m.getIdUser());
		});
		String where = StringUtils.join(notIn, ',');
		System.out.println(where);
		s.setValue(where);
		c.setData("idUser");
		c.setSearch(s);
		columns.add(c);
		columnsCount.add(c);
		List<User> data = userRepo.findAll(DataTable(columns));
//		
//		response.put("draw", input.getDraw());
//		response.put("recordsTotal", userRepo.findAll(CountDataTable(columnsCount)).size());
//		response.put("recordsFiltered", data.getTotalElements());
		response.put("data", data);
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/eligible/list/add_process")
	public ResponseEntity<JSONObject> editPeriod(@RequestBody final JSONObject post) {
		JSONObject response = new JSONObject();
		
		List<Eligible> dataSave = new ArrayList<>();
		String userId = post.getAsString("data");
		String idPeriod = post.getAsString("id");
		
		if(userId != "") {
			for (String data : userId.split(",")) {
		    	Eligible e = new Eligible();
				e.setIdPeriod(Long.parseLong(idPeriod));
				e.setIdUser(Long.parseLong(data));
		    	dataSave.add(e);
			}
			
			if(eligibleRepo.save(dataSave)!=null) 
			{
				response.put("status", "1");
				response.put("message", "Data added successfully!");
			} 
			else 
			{
				response.put("status", "2");
				response.put("message", "Failed to save data!");
			}
		} else {
			response.put("status", "2");
			response.put("message", "Please select a user!");
		}
	    
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/eligible/list/delete_process")
	public ResponseEntity<JSONObject> deleteEligible(@RequestBody final JSONObject post) {
		JSONObject response = new JSONObject();
		
		if(post.getAsString("id_user")!="" && post.getAsString("id_period")!="") {
			Eligible eligible = eligibleRepo.findByIdPeriodAndIdUser(Long.valueOf(post.getAsString("id_period")).longValue(),Long.valueOf(post.getAsString("id_user")).longValue());
			eligibleRepo.delete(eligible);
			
			response.put("status", "1");
			response.put("message", "Data deleted successfully");
		} else {
			response.put("status", "2");
			response.put("message", "Failed to delete data!");
		}
		
		return ResponseEntity.ok(response);	
	}
}
