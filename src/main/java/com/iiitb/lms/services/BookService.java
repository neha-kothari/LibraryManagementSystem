package com.iiitb.lms.services;

import com.iiitb.lms.beans.dto.BookDetailsDTO;
import com.iiitb.lms.beans.dto.BookDto;
import com.iiitb.lms.beans.dto.DashBoardBookDTO;
import org.springframework.stereotype.Service;

import java.util.List;

public interface BookService {

    void addBook(BookDto bookDto);
    boolean isbnExists(String isbnNumber);
    boolean deleteBook(Integer bookId);
    List<BookDetailsDTO> getAllBooks();
    BookDetailsDTO getBookDetails(Integer bookId);
}
