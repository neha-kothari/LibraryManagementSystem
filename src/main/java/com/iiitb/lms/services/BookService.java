package com.iiitb.lms.services;

import com.iiitb.lms.beans.Book;

public interface BookService {
    Book save(BookDto bookDto);
    Boolean delete(Book book);
    Boolean addBookItem(BookItemDto bookItemDto);
    Boolean removeBookItem(Integer itemId);

}
