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
import com.example.tas.model.Period;
import com.example.tas.repository.PeriodRepo;

import net.minidev.json.JSONObject;

@RestController
public class PeriodController extends ApiController<Period>  {

	@Autowired
	private PeriodRepo periodRepo;
	
	@PostMapping(value="/period/list")
	public ResponseEntity<JSONObject> getPeriodList(@Valid @RequestBody DataTablesInput input) {
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
		Page<Period> data = periodRepo.findAll(DataTable(columns), page);
		response.put("draw", input.getDraw());
		response.put("recordsTotal", periodRepo.findAll(CountDataTable(columnsCount)).size());
		response.put("recordsFiltered", data.getTotalElements());
		response.put("data", data.getContent());
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/period/add")
	public ResponseEntity<JSONObject> addPeriod(@RequestBody final Period post) {
		JSONObject response = new JSONObject();
		String active = post.getActive();
		
		if(active.equals("on"))
		{
			post.setActive("1");
		} 
		else 
		{
			post.setActive("0");
		}
		
		if(periodRepo.save(post)!=null) 
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
	
	@PostMapping(value="/period/edit")
	public ResponseEntity<JSONObject> editPeriod(@RequestBody final JSONObject post) {
		JSONObject response = new JSONObject();
		System.out.println();
		Period period = periodRepo.findOne(Long.valueOf(post.getAsString("id")).longValue());

		if(period!=null) 
		{
			response.put("status", "1");
			response.put("message", period);
		} 
		else 
		{
			response.put("status", "2");
			response.put("message", "Data not found!");
		}
		
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/period/edit_process")
	public ResponseEntity<JSONObject> editProcessPeriod(@RequestBody final JSONObject post) {
		JSONObject response = new JSONObject();		
		Period period = periodRepo.findOne(Long.valueOf(post.getAsString("idPeriod")).longValue());
        period.setPeriodName(post.getAsString("periodName"));
        period.setStartDate(post.getAsString("startDate"));
        period.setEndDate(post.getAsString("endDate"));
		
		if(post.getAsString("active").equals("on"))
		{
			period.setActive("1");
		} 
		else 
		{
			period.setActive("0");
		}
		
		if(periodRepo.save(period)!=null) 
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
	
	@PostMapping(value="/period/delete")
	public ResponseEntity<JSONObject> deletePeriod(@RequestBody final JSONObject post) {
		JSONObject response = new JSONObject();		
		Period period = periodRepo.findOne(Long.valueOf(post.getAsString("id")).longValue());
        period.setDeleted(1);

		if(periodRepo.save(period)!=null) 
		{
			response.put("status", "1");
			response.put("message", "Data deleted successfully!");
		} 
		else 
		{
			response.put("status", "2");
			response.put("message", "Failed to delete data!");
		}
		
		return ResponseEntity.ok(response);
	}
}
