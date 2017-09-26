package com.example.tas.controller;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")
public abstract class ApiController<U> {

	protected Specification<U> notDeleted() {
	    return new Specification<U>() {
	      public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
	            CriteriaBuilder builder) {
	    	  return builder.equal(root.get("deleted"), 0);
	      }
	    };
	}
}
