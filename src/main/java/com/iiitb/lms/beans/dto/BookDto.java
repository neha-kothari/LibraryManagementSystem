package com.iiitb.lms.beans.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
public class BookDto {

    private Integer bookId;
    private String bookTitle;
    private String isbnNumber;
    private String publisher;
    private String language;
    private int noOfPages;
    private int noOfCopies;
    @JsonProperty
    private boolean isReferenceOnly;
    private double price;
    private char status;
    private Date dateOfPurchase;
    private int publicationYear;
    private List<String> authors;
    public String error;

}
