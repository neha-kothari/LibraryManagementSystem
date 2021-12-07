package com.iiitb.lms.beans.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class BookReservationRequestDTO {

    private int reservationId;
    private String reservationStatus;
    private Date reservationDate;
    private Date validityTill;
    private int memberId;
    private int bookItemId;
    private int bookId;
    private String error;
}
