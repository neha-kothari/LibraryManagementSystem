package com.iiitb.lms.beans.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@NoArgsConstructor
public class BookDto {
    private String bookTitle;
    private String isbnNumber;
    private String publisher;
    private String language;
    private int noOfPages;
    private List<Integer> authorIds;

}
