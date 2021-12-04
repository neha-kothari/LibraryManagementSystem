package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.dto.BookDto;
import com.iiitb.lms.beans.dto.DashBoardBookDTO;
import com.iiitb.lms.repositories.BookRepository;
import com.iiitb.lms.services.BookItemService;
import com.iiitb.lms.services.BookService;
import com.iiitb.lms.utils.transformers.BookTransformer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

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

    @Override
    public boolean deleteBook(Integer bookId) {
        Book book = bookRepository.findByBookId(bookId);
        if (book != null && !book.isDelFlag()) {
            book.setDelFlag(true);
            bookRepository.save(book);
            return true;
        }
        return false;
    }

    @Override
    public List<DashBoardBookDTO> getAllBooks() {
        List<Book> books = bookRepository.findByDelFlagFalse();
        return bookTransformer.getBooksList(books);
    }

}
