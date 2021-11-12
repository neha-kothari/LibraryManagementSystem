package com.iiitb.lms.beans;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class FineTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fineId;
}
