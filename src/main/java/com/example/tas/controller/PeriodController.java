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
	public ResponseEntity<JSONObject> addPeriod(@RequestBody JSONObject post) {
		JSONObject response = new JSONObject();
		System.out.println(post);
		return ResponseEntity.ok(response);
	}
}
