package com.iiitb.lms.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class BookLending {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;
}
