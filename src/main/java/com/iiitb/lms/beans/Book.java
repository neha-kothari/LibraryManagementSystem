package com.iiitb.lms.beans;
import javax.persistence.*;


@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookId;
    @Column(nullable = false)
    private String bookTitle;
    @Column(nullable = false)
    private String isbnNumber;
    @Column(nullable = false)
    private String publisher;

    private String language;
    private int noOfPages;

    public Book() {
    }

    public Integer getBookId() {
        return bookId;
    }

    public Book(String bookTitle, String isbnNumber, String publisher, String language, int noOfPages) {
        this.bookTitle = bookTitle;
        this.isbnNumber = isbnNumber;
        this.publisher = publisher;
        this.language = language;
        this.noOfPages = noOfPages;
    }

    public String getBookTitle() {
        return bookTitle;
    }

    public void setBookTitle(String bookTitle) {
        this.bookTitle = bookTitle;
    }

    public String getIsbnNumber() {
        return isbnNumber;
    }

    public void setIsbnNumber(String isbnNumber) {
        this.isbnNumber = isbnNumber;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public int getNoOfPages() {
        return noOfPages;
    }

    public void setNoOfPages(int noOfPages) {
        this.noOfPages = noOfPages;
    }
}
