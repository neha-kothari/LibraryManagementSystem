package com.iiitb.lms.beans.dto;

import java.util.List;

public class BookDto {
    private String bookTitle;
    private String isbnNumber;
    private String publisher;
    private String language;
    private int noOfPages;
    private List<Integer> authorIds;

    public BookDto(){}

    public BookDto(String bookTitle, String isbnNumber, String publisher, String language, int noOfPages, List<Integer> authorIds) {
        this.bookTitle = bookTitle;
        this.isbnNumber = isbnNumber;
        this.publisher = publisher;
        this.language = language;
        this.noOfPages = noOfPages;
        this.authorIds = authorIds;
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

    public List<Integer> getAuthorIds() {
        return authorIds;
    }

    public void setAuthorIds(List<Integer> authorIds) {
        this.authorIds = authorIds;
    }
}
