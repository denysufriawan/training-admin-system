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
import com.example.tas.repository.PeriodCourseRepo;

import net.minidev.json.JSONObject;

@RestController
public class PeriodCourseController extends ApiController<PeriodCourse>  {
	
	@Autowired
	private PeriodCourseRepo periodCourseRepo;
	
	@PostMapping(value="/period_course/list/{id}")
	public ResponseEntity<JSONObject> getScheduleList(@Valid @RequestBody DataTablesInput input, @PathVariable Long id) {
		JSONObject response = new JSONObject();
		System.out.println(id);
		List<Sort.Order> orders = new ArrayList<>();
		List<Column> columns = input.getColumns();
		List<Column> columnsCount = new ArrayList<>();
		Column c = new Column();
		Search s = new Search();
		
		Column c1 = new Column();
		Search s1 = new Search();
		
		for (org.springframework.data.jpa.datatables.mapping.Order item : input.getOrder()) {
			String columnName = columns.get(item.getColumn()).getData();
			if(item.getDir().equals("asc"))
				orders.add(new Sort.Order(Direction.ASC, columnName));
			else
				orders.add(new Sort.Order(Direction.DESC, columnName));
		}
		
		//if deleted==0
		s.setValue("0");
		c.setData("deleted");
		c.setSearch(s);
		
		//if id_period == id
		s1.setValue(Long.toString(id));
		c1.setData("idPeriod");
		c1.setSearch(s1);
		
		columns.add(c);
		columnsCount.add(c);
		columns.add(c1);
		columnsCount.add(c1);
		Sort sorts = new Sort(orders);
		PageRequest page = new PageRequest((int)Math.ceil(input.getStart()/input.getLength()),input.getLength(),sorts);
		Page<PeriodCourse> data = periodCourseRepo.findAll(DataTable(columns), page);
		response.put("draw", input.getDraw());
		response.put("recordsTotal", periodCourseRepo.findAll(CountDataTable(columnsCount)).size());
		response.put("recordsFiltered", data.getTotalElements());
		response.put("data", data.getContent());
		return ResponseEntity.ok(response);
	}

}
