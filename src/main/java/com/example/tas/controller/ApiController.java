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
//	    	  query.distinct(true);
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
	    			  else if(item.getData().equals("deleted") || item.getData().equals("startDate") || item.getData().equals("endDate") )
	    				  where.add(builder.equal(root.get(item.getData()), search));
	    			  else if(item.getData().equals("active") || item.getData().equals("idUser")) {
	    				  if(search.contains(",")) {
	    					  String [] wherein = search.split(",");
		    				  List<String> myList = new ArrayList<String> ();
		    				  for (String u : wherein) {
		    				      myList.add(u);
		    				  }
		    				  if(item.getData().equals("idUser"))
		    					  where.add(builder.not(root.get(item.getData()).in(myList)));
		    				  else
		    					  where.add(builder.and(root.get(item.getData()).in(myList)));
	    				  }
	    				  else
	    					  where.add(builder.equal(root.get(item.getData()), search));
	    			  }
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
//	    	  query.distinct(true);
	    	  List<Predicate> where = new ArrayList<>();
	    	  for (Column item : columns) {
	    		  String search = item.getSearch().getValue();
	    		  if(!search.equals("")) {
	    			  //join
	    			  if(item.getData().contains("."))
	    			  {
	    				  String [] array = item.getData().split("\\.");
	    				  where.add(builder.equal(root.join(array[0]).get(array[1]), search));
	    			  }
	    			  //equal
	    			  else if(item.getData().equals("deleted") || item.getData().equals("startDate") || item.getData().equals("endDate"))
	    				  where.add(builder.equal(root.get(item.getData()), search));
	    			  //multiselect
	    			  else if(item.getData().equals("active") || item.getData().equals("idUser")) {
	    				  if(search.contains(",")) {
	    					  String [] wherein = search.split(",");
		    				  List<String> myList = new ArrayList<String> ();
		    				  for (String u : wherein) {
		    				      myList.add(u);
		    				  }
		    				  if(item.getData().equals("idUser"))
		    					  where.add(builder.not(root.get(item.getData()).in(myList)));
		    				  else
		    					  where.add(builder.and(root.get(item.getData()).in(myList)));
	    				  }
	    				  else
	    					  where.add(builder.equal(root.get(item.getData()), search));
	    			  }
	    			  //other
	    			  else
	    			  {
	    				  where.add(builder.like(root.get(item.getData()), "%"+search+"%"));
	    			  }	    			
	    		  }
	    	  }
	    	  //where.add(builder.equal(root.join("eligibleUser").get("name"), "Daniel Muliawan"));
	    	  return builder.and(where.toArray(new Predicate[0]));
	      }
	    };
	}
	
	protected Specification<U> CountDataTableUser(List<Column> columns) {
	    return new Specification<U>() {
	      public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
	            CriteriaBuilder builder) {
	    	  query.distinct(true);
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
	
	protected Specification<U> DataTableUser(List<Column> columns) {
	    return new Specification<U>() {
	      public javax.persistence.criteria.Predicate toPredicate(Root<U> root, CriteriaQuery<?> query,
	            CriteriaBuilder builder) {
	    	  query.distinct(true);
	    	  List<Predicate> where = new ArrayList<>();
	    	  for (Column item : columns) {
	    		  String search = item.getSearch().getValue();
	    		  if(!search.equals("")) {
	    			  //join
	    			  if(item.getData().equals("role.idRole") || item.getData().equals("jobStream.idJobStream") || item.getData().equals("jobStream.jobFamily.idJobFamily") || item.getData().equals("grade.idGrade"))
	    			  {
	    				  String [] array = item.getData().split("\\.");
	    				  if(array[1].equals("jobFamily")) {
	    					  where.add(builder.equal(root.join(array[0]).join(array[1]).get(array[2]), search));
		    			  }
	    				  else
	    				  {
	    					  if(search.contains(",")) {
	    						  
		    					  String [] wherein = search.split(",");
			    				  List<String> myList = new ArrayList<String> ();
			    				  for (String u : wherein) {
			    				      myList.add(u);
			    				  }
			    				  where.add(builder.and(root.join(array[0]).get(array[1]).in(myList)));
			    					  
		    				  }
		    				  else
		    					  where.add(builder.equal(root.join(array[0]).get(array[1]), search));
	    				  }
	    			  }
	    			  //equal
	    			  else if(item.getData().equals("deleted") || item.getData().equals("idUser"))
	    				  where.add(builder.equal(root.get(item.getData()), search));
	    			  //multiselect
	    			  else if(item.getData().equals("active")) {
	    				  if(search.contains(",")) {
	    					  String [] wherein = search.split(",");
		    				  List<String> myList = new ArrayList<String> ();
		    				  for (String u : wherein) {
		    				      myList.add(u);
		    				  }
		    				  where.add(builder.and(root.get(item.getData()).in(myList)));
		    					  
	    				  }
	    				  else
	    					  where.add(builder.equal(root.get(item.getData()), search));
	    			  }
	    			  //other
	    			  else
	    			  {
	    				  where.add(builder.like(root.get(item.getData()), "%"+search+"%"));
	    			  }	    			
	    		  }
	    	  }
	    	  return builder.and(where.toArray(new Predicate[0]));
	      }
	    };
	}
}
