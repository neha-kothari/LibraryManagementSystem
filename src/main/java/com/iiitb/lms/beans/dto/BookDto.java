package com.iiitb.lms.beans.dto;

import com.iiitb.lms.beans.Author;
import com.iiitb.lms.beans.BookItem;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

public class BookDto {
    private String bookTitle;
    private String isbnNumber;
    private String publisher;
    private String language;
    private int noOfPages;
    Set<Author> authors;
    private List<BookItem> bookItemList;


}
