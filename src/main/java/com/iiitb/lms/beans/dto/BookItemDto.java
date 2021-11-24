package com.iiitb.lms.beans.dto;

import java.util.Date;

public class BookItemDto {
    private Integer bookId;

    private boolean isReferenceOnly;
    private double price;
    private char status;
    private Date dateOfPurchase;
    private Date publicationDate;

    public BookItemDto(Integer bookId, boolean isReferenceOnly, double price, char status, Date dateOfPurchase, Date publicationDate) {
        this.bookId = bookId;
        this.isReferenceOnly = isReferenceOnly;
        this.price = price;
        this.status = status;
        this.dateOfPurchase = dateOfPurchase;
        this.publicationDate = publicationDate;
    }

    public Integer getBookId() {
        return bookId;
    }

    public void setBookId(Integer bookId) {
        this.bookId = bookId;
    }

    public boolean isReferenceOnly() {
        return isReferenceOnly;
    }

    public void setReferenceOnly(boolean referenceOnly) {
        isReferenceOnly = referenceOnly;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public char getStatus() {
        return status;
    }

    public void setStatus(char status) {
        this.status = status;
    }

    public Date getDateOfPurchase() {
        return dateOfPurchase;
    }

    public void setDateOfPurchase(Date dateOfPurchase) {
        this.dateOfPurchase = dateOfPurchase;
    }

    public Date getPublicationDate() {
        return publicationDate;
    }

    public void setPublicationDate(Date publicationDate) {
        this.publicationDate = publicationDate;
    }
}
