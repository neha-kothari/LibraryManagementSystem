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
    private int itemId;

    @ManyToOne
    @JoinColumn(name="book_id", referencedColumnName = "bookId")
    private Book book;

    @Column(columnDefinition = "BOOLEAN")
    private Boolean isReferenceOnly;
    @Column
    private double price;
    @Column
    private char status;
    @Column
    private Date dateOfPurchase;
    @Column(columnDefinition = "BOOLEAN")
    private boolean delFlag;

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

}
