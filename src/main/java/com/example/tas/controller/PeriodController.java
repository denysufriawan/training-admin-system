package com.example.tas.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.DataTablesInput;
import org.springframework.data.jpa.datatables.mapping.DataTablesOutput;
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
	public DataTablesOutput<Period> getPeriodList(@Valid @RequestBody DataTablesInput input) {
		return periodRepo.findAll(input,notDeleted());
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
