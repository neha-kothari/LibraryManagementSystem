package com.iiitb.lms.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
public class BookReservation {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int reservationId;

    @Column(nullable = false)
    private char reservationStatus;

    @Column(nullable = false)
    private Date reservationDate;

    @Column
    private Date validityTill;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User member;

    @ManyToOne
    @JoinColumn(name="bookItem_id")
    private BookItem bookItem;

}
