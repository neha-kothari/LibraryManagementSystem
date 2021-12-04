package com.iiitb.lms.beans.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BookItemDto {
    private Integer bookId;
    private boolean isReferenceOnly;
    private double price;
    private char status;
    private Date dateOfPurchase;
    private Date publicationDate;
}
