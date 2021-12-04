package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.dto.BookDto;
import com.iiitb.lms.repositories.BookRepository;
import com.iiitb.lms.services.BookItemService;
import com.iiitb.lms.services.BookService;
import com.iiitb.lms.utils.transformers.BookTransformer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class BookServiceImpl implements BookService {

    @Resource
    private BookRepository bookRepository;

    @Resource
    private BookTransformer bookTransformer;

    @Resource
    private BookItemService bookItemService;

    public void addBook(BookDto bookDto) {

        Book book = new Book();
        bookTransformer.toEntity(book, bookDto);
        book = bookRepository.save(book);
        for (int i = 0; i < bookDto.getNoOfCopies(); i++) {
            bookItemService.addBookItem(bookDto, book);
        }
    }

    @Override
    public boolean isbnExists(String isbnNumber) {

        Book book = bookRepository.findByIsbnNumber(isbnNumber);
        return book != null;
    }

}