package com.iiitb.lms.beans.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BookReturnDetailsDTO {

    private int orderId;
    private int memberId;
    private int bookItemId;
    private int bookId;
    private int issuedByUserId;
    private String status;
    private Date issueDate;
    private Date dueDate;
    private Date returnDate;
    private double fine;
    public String error;
}
