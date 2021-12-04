package com.iiitb.lms.services;

import com.iiitb.lms.beans.dto.BookDto;
import org.springframework.stereotype.Service;

public interface BookService {

    void addBook(BookDto bookDto);
    boolean isbnExists(String isbnNumber);
}
