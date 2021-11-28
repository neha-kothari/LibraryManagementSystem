package com.iiitb.lms.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
public class FineTransaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int fineId;
    @Column
    private char status;
    @Column
    private String paymentMode;
    @Column
    private Date transactionDate;
    @OneToOne
    private BookLending orderId;
}
