package com.iiitb.lms.beans.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.Date;
import java.util.List;

public class DashBoardBookDTO {

    private Integer bookId;
    private String bookTitle;
    private String isbnNumber;
    private String publisher;
    private String language;
    private int noOfPages;
    private int availableCopies;
    @JsonProperty
    private boolean isReferenceOnly;
    private double price;
    private Date dateOfPurchase;
    private int publicationYear;
    private List<String> authors;
    public String error;
}
