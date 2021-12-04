package com.iiitb.lms.beans.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@NoArgsConstructor
public class DashBoardBookDTO {

    private Integer bookId;
    private String bookTitle;
    private String isbnNumber;
    private String publisher;
    private String language;
    private int publicationYear;
    private List<String> authors;
    public String error;
}
