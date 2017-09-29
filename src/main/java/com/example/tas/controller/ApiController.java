package com.example.tas.controller;

import java.util.ArrayList;
import java.util.List;

import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;

import org.springframework.data.jpa.datatables.mapping.Column;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.web.bind.annotation.RequestMapping;

@RequestMapping("/api")
public abstract class ApiController<U> {

	protected Specification<U> CountDataTable(List<Column> columns) {
	    return new Specification<U>() {
	      public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
	            CriteriaBuilder builder) {
	    	  List<Predicate> where = new ArrayList<>();
	    	  for (Column item : columns) {
	    		  String search = item.getSearch().getValue();
	    		  if(!search.equals(""))
    			  {
	    			  if(item.getData().contains("."))
	    			  {
	    				  String [] array = item.getData().split("\\.");
	    				  where.add(builder.equal(root.join(array[0]).get(array[1]), search));
	    			  }
	    			  else if(item.getData().equals("deleted"))
	    				  where.add(builder.equal(root.get(item.getData()), search));
	    			  else
	    				  where.add(builder.like(root.get(item.getData()), "%"+search+"%"));
    			  }
	    	  }
	    	  return builder.and(where.toArray(new Predicate[0]));
	      }
	    };
	}
	
	protected Specification<U> DataTable(List<Column> columns) {
	    return new Specification<U>() {
	      public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
	            CriteriaBuilder builder) {
	    	  List<Predicate> where = new ArrayList<>();
	    	  for (Column item : columns) {
	    		  String search = item.getSearch().getValue();
	    		  if(!search.equals("")) {
	    			  if(item.getData().contains("."))
	    			  {
	    				  String [] array = item.getData().split("\\.");
	    				  where.add(builder.equal(root.join(array[0]).get(array[1]), search));
	    			  }
	    			  else if(item.getData().equals("deleted"))
	    				  where.add(builder.equal(root.get(item.getData()), search));
	    			  else
	    				  where.add(builder.like(root.get(item.getData()), "%"+search+"%"));
	    		  }
	    	  }
	    	  //where.add(builder.equal(root.join("eligibleUser").get("name"), "Daniel Muliawan"));
	    	  return builder.and(where.toArray(new Predicate[0]));
	      }
	    };
	}
}
