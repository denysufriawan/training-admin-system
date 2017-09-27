package com.example.tas.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.tas.model.User;
import com.example.tas.repository.UserRepo;
import net.minidev.json.JSONObject;

@RestController
public class AuthController extends ApiController{
	
	private BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
	
	@Autowired
	private UserRepo userRepo;
	
	@PostMapping(value="/login")
	public ResponseEntity<JSONObject> login(@RequestBody JSONObject post ) {
		JSONObject response = new JSONObject();
		User user = userRepo.findByUsernameIgnoreCase((String) post.get("username"));
		if(user!=null)
		{
			if(passwordEncoder.matches((String)post.get("password"), user.getPassword()))
			{
				JSONObject data = new JSONObject();
				data.put("user", user);
				data.put("activeRole", user.getRole().get(0).getIdRole());
				response.put("status", "1");
				response.put("message", data);
			}
			else
			{
				response.put("status", "2");
				response.put("message", "Wrong username/password!");
			}
		}
		else
		{
			response.put("status", "2");
			response.put("message", "This Account is not registered in the system!");
		}
		return ResponseEntity.ok(response);
	}
	
}
