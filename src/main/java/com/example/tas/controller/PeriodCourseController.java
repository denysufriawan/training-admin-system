package com.example.tas.controller;

import java.text.DateFormat;
import java.text.Format;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;
import java.util.Locale;

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

import com.example.tas.model.CourseSchedule;
import com.example.tas.model.Eligible;
import com.example.tas.model.PeriodCourse;
import com.example.tas.repository.ClassRepo;
import com.example.tas.repository.CourseRepo;
import com.example.tas.repository.CourseScheduleRepo;
import com.example.tas.repository.EligibleRepo;
import com.example.tas.repository.PeriodCourseRepo;
import com.example.tas.repository.PeriodRepo;
import com.example.tas.repository.UserRepo;

import net.minidev.json.JSONObject;

@RestController
public class PeriodCourseController extends ApiController<PeriodCourse>  {
	
	@Autowired
	private PeriodCourseRepo periodCourseRepo;
	
	@Autowired
	private CourseScheduleRepo courseScheduleRepo;
	
	@Autowired
	private PeriodRepo periodRepo;
	
	@Autowired
	private CourseRepo courseRepo;
	
	@Autowired
	private ClassRepo classRepo;
	
	@Autowired
	private UserRepo userRepo;
	
	@Autowired
	private EligibleRepo eligibleRepo;
	
	@PostMapping(value="/period_course/list/{id}")
	public ResponseEntity<JSONObject> getScheduleList(@Valid @RequestBody DataTablesInput input, @PathVariable Long id) {
		JSONObject response = new JSONObject();

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
		c1.setData("period.idPeriod");
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
	
	@PostMapping(value="/period_course/add_schedule")
	public ResponseEntity<JSONObject> addSchedulePeriod(@RequestBody final JSONObject post) {
		JSONObject response = new JSONObject();
		
		List<PeriodCourse> periodCourseData = new ArrayList<>();
		List<CourseSchedule> courseScheduleData = new ArrayList<>();

		String scheduleType = post.getAsString("scheduleType");
		String startDate = post.getAsString("startTime");
		String endDate = post.getAsString("endTime");
		
		if(scheduleType.equals("Periodical")) {
			Calendar cal = new GregorianCalendar(Integer.parseInt(startDate.substring(0,4)),Integer.parseInt(startDate.substring(5,7))-1,Integer.parseInt(startDate.substring(8,10)));
			if (Calendar.SUNDAY == cal.get(Calendar.DAY_OF_WEEK) || Calendar.SATURDAY == cal.get(Calendar.DAY_OF_WEEK)) {
				response.put("status", "2");
				response.put("message", "Start date must be in business day!");
			} else {
				//periodical
				PeriodCourse pc = new PeriodCourse();
				
				pc.setCourse(courseRepo.findOne(Long.valueOf(post.getAsString("courseName")).longValue()));
				pc.setPeriod(periodRepo.findOne(Long.valueOf(post.getAsString("idPeriod")).longValue()));
				pc.setClassRoom(classRepo.findOne(Long.valueOf(post.getAsString("classRoom")).longValue()));
				pc.setTrainerMain(userRepo.findOne(Long.valueOf(post.getAsString("mainTrainer")).longValue()));
				pc.setTrainerBackup(userRepo.findOne(Long.valueOf(post.getAsString("backupTrainer")).longValue()));
				pc.setScheduleType(post.getAsString("scheduleType"));
				pc.setCapacity(post.getAsString("capacity"));
				pc.setStartTime(post.getAsString("startTime"));
				pc.setEndTime(post.getAsString("endTime"));
				pc.setCreatedBy(post.getAsString("createdBy"));
				pc.setUpdatedBy(post.getAsString("updatedBy"));
				pc.setDeleted(0);
				periodCourseData.add(pc);
				
				if(periodCourseRepo.save(periodCourseData)!=null) 
				{
					periodCourseRepo.flush();
					long current_id = pc.getIdPeriodCourse();
					LocalDate start = LocalDate.parse(post.getAsString("startCourseDate")),
					          end   = LocalDate.parse(post.getAsString("endCourseDate"));
					
					LocalDate next = start.minusDays(0);
					
					CourseSchedule csf = new CourseSchedule();
					csf.setIdPeriodCourse(current_id);
					csf.setCourseDate(next.toString());
					courseScheduleData.add(csf);
					
					if(courseScheduleRepo.save(courseScheduleData)==null)
					{
						response.put("status", "2");
						response.put("message", "Failed to save data!");
					}	
					
					while ((next = next.plusDays(7)).isBefore(end.plusDays(0))) {
						//looping based in course date range
						CourseSchedule cs = new CourseSchedule();
						cs.setIdPeriodCourse(current_id);
						cs.setCourseDate(next.toString());
						courseScheduleData.add(cs);
						
						if(courseScheduleRepo.save(courseScheduleData)==null)
						{
							response.put("status", "2");
							response.put("message", "Failed to save data!");
						}	
					}
					
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
		} else {
			//fixed
			PeriodCourse pc = new PeriodCourse();
			
			pc.setCourse(courseRepo.findOne(Long.valueOf(post.getAsString("courseName")).longValue()));
			pc.setPeriod(periodRepo.findOne(Long.valueOf(post.getAsString("idPeriod")).longValue()));
			pc.setClassRoom(classRepo.findOne(Long.valueOf(post.getAsString("classRoom")).longValue()));
			pc.setTrainerMain(userRepo.findOne(Long.valueOf(post.getAsString("mainTrainer")).longValue()));
			pc.setTrainerBackup(userRepo.findOne(Long.valueOf(post.getAsString("backupTrainer")).longValue()));
			pc.setScheduleType(post.getAsString("scheduleType"));
			pc.setCapacity(post.getAsString("capacity"));
			pc.setStartTime(post.getAsString("startTime"));
			pc.setEndTime(post.getAsString("endTime"));
			pc.setCreatedBy(post.getAsString("createdBy"));
			pc.setUpdatedBy(post.getAsString("updatedBy"));
			pc.setDeleted(0);
			periodCourseData.add(pc);
			
			if(periodCourseRepo.save(periodCourseData)!=null) 
			{
				periodCourseRepo.flush();
				long current_id = pc.getIdPeriodCourse();
				LocalDate start = LocalDate.parse(post.getAsString("startCourseDate")),
				          end   = LocalDate.parse(post.getAsString("endCourseDate"));
				
				LocalDate next = start.minusDays(1);
				while ((next = next.plusDays(1)).isBefore(end.plusDays(1))) {
					//looping based in course date range
					
					Calendar cal = new GregorianCalendar(Integer.parseInt(next.toString().substring(0,4)),Integer.parseInt(next.toString().substring(5,7))-1,Integer.parseInt(next.toString().substring(8,10)));
					if (Calendar.SUNDAY != cal.get(Calendar.DAY_OF_WEEK) && Calendar.SATURDAY != cal.get(Calendar.DAY_OF_WEEK)) {
						CourseSchedule cs = new CourseSchedule();
						cs.setIdPeriodCourse(current_id);
						cs.setCourseDate(next.toString());
						courseScheduleData.add(cs);
						
						if(courseScheduleRepo.save(courseScheduleData)==null)
						{
							response.put("status", "2");
							response.put("message", "Failed to save data!");
						}
					}	
				}
				
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
		
		return ResponseEntity.ok(response);
	}
	
	@PostMapping(value="/period_course/enroll_process")
	public ResponseEntity<JSONObject> enrollUser(@RequestBody final JSONObject post) {
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

}
