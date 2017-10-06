package com.example.tas.controller;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.datatables.mapping.Column;
import org.springframework.data.jpa.datatables.mapping.Search;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.tas.model.Eligible;
import com.example.tas.model.UserCourse;
import com.example.tas.repository.EligibleRepo;
import com.example.tas.repository.PeriodCourseRepo;
import com.example.tas.repository.UserCourseRepo;
import com.example.tas.repository.UserRepo;

import net.minidev.json.JSONObject;

@RestController
public class EligibleCourseController extends ApiController<Eligible> {

	@Autowired
	private EligibleRepo eligibleRepo;
	
	@Autowired
	private PeriodCourseRepo periodCourseRepo;
	
	@Autowired
	private UserCourseRepo userCourseRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@PostMapping(value="/eligibleCourse/list/{id}")
	public ResponseEntity<JSONObject> getEligibleCourseList(@PathVariable Long id) {
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
		
		List<UserCourse> dataIn = userCourseRepo.findByPeriodCourse(periodCourseRepo.findOne(id));
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
		List<Eligible> data = eligibleRepo.findAll(DataTable(columns));
		
		data.forEach(m -> {
			m.user=userRepo.findOne(m.getIdUser());
		});
//		
//		response.put("draw", input.getDraw());
//		response.put("recordsTotal", userRepo.findAll(CountDataTable(columnsCount)).size());
//		response.put("recordsFiltered", data.getTotalElements());
		response.put("data", data);
		return ResponseEntity.ok(response);
	}

}
