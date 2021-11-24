package com.iiitb.lms.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

@Data
@NoArgsConstructor
@Entity
public class BookItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="book_item_id")
    private int itemId;

    @ManyToOne
    @JoinColumn(name="bookId", referencedColumnName = "bookId")
    private Book book;

    @Column
    private boolean isReferenceOnly;
    @Column
    private double price;
    @Column
    private char status;
    @Column
    private Date dateOfPurchase;
    @Column
    private Date publicationDate;

    public BookItem(Book book, boolean isReferenceOnly, double price, char status, Date dateOfPurchase, Date publicationDate) {
        this.book = book;
        this.isReferenceOnly = isReferenceOnly;
        this.price = price;
        this.status = status;
        this.dateOfPurchase = dateOfPurchase;
        this.publicationDate = publicationDate;
    }
}
