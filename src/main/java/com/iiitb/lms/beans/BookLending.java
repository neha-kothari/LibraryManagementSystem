package com.iiitb.lms.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
public class BookLending {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int orderId;

    @ManyToOne
    @JoinColumn(name="member_id")
    private User member;

    @ManyToOne
    @JoinColumn(name="bookItem_id")
    private BookItem bookItem;

    @ManyToOne
    @JoinColumn(name="issuedBy")
    private User issuedBy;

    @Column
    private char status;

    @Column
    private Date issueDate;

    @Column
    private Date dueDate;

    @Column
    private Date returnDate;

    @OneToOne
    private FineTransaction fine;

}
