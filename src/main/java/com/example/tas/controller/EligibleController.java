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
	public ResponseEntity<JSONObject> getAddEligibleList(@Valid @RequestBody DataTablesInput input, @PathVariable Long id) {
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
		Sort sorts = new Sort(orders);
		PageRequest page = new PageRequest((int)Math.ceil(input.getStart()/input.getLength()),input.getLength(),sorts);
		
		List<Eligible> dataIn = eligibleRepo.findByidPeriod(id);
		List<Long> notIn= new ArrayList<>();
		dataIn.forEach(m -> {
			notIn.add(m.getIdUser());
		});
		String where = StringUtils.join(notIn, ',');
		s.setValue(where);
		c.setData("idUser");
		c.setSearch(s);
		columns.add(c);
		columnsCount.add(c);
		Page<User> data = userRepo.findAll(DataTable(columns),page);
		
		response.put("draw", input.getDraw());
		response.put("recordsTotal", userRepo.findAll(CountDataTable(columnsCount)).size());
		response.put("recordsFiltered", data.getTotalElements());
		response.put("data", data.getContent());
		return ResponseEntity.ok(response);
	}
}
