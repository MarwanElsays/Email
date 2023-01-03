package com.example.mailserver.Logic.Filter;


import com.example.mailserver.Logic.Email;

public interface Criteria {
    public String meetCriteria(String required, Email[] emails, String criteria);
}
