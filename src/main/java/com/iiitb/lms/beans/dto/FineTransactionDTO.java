package com.iiitb.lms.beans.dto;

import com.iiitb.lms.beans.BookLending;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.OneToOne;
import java.util.Date;

@Data
@NoArgsConstructor
public class FineTransactionDTO {

    private int fineId;
    private char status;
    private float fineAmount;
    private String paymentMode;
    private Date transactionDate;
    private int orderId;
    private int memberId;
    private int bookItemId;
    private String error;
}
