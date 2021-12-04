package com.iiitb.lms.beans.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;


@Data
@NoArgsConstructor
public class BookDto {
    private String bookTitle;
    private String isbnNumber;
    private String publisher;
    private String language;
    private int noOfPages;
    private int noOfCopies;
    private boolean isReferenceOnly;
    private double price;
    private char status;
    private Date dateOfPurchase;
    private Date publicationDate;
    private List<Integer> authorIds;

}
