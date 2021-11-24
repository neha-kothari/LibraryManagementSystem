package com.iiitb.lms.services;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import com.iiitb.lms.beans.dto.BookDto;
import com.iiitb.lms.beans.dto.BookItemDto;

public interface BookService {
    Book save(BookDto bookDto);
    Boolean delete(Integer bookId);
    BookItem addBookItem(BookItemDto bookItemDto);
    Boolean removeBookItem(Integer itemId);

}
