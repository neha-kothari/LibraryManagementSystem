package com.iiitb.lms.services;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import com.iiitb.lms.beans.dto.BookDto;
import org.springframework.stereotype.Service;

public interface BookItemService {
    BookItem addBookItem(BookDto request, Book book);

}
