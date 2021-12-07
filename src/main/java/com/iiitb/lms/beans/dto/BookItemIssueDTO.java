package com.iiitb.lms.beans.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BookItemIssueDTO {

    private int orderId;
    private int memberId;
    private int bookItem;
    private int issuedBy;
    private char status;
    private Date issueDate;
    private Date dueDate;
    private Date returnDate;
    private double fine;
}
