package com.iiitb.lms.services;

import com.iiitb.lms.beans.Author;
import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookDto;
import com.iiitb.lms.beans.dto.BookItemDto;
import com.iiitb.lms.repositories.AuthorRepository;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.repositories.BookRepository;
import com.iiitb.lms.repositories.UserRepository;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

@Service
public class BookServiceImpl implements BookService{

    private UserRepository userRepository;
    private BookRepository bookRepository;
    private BookItemRepository bookItemRepository;
    private AuthorRepository authorRepository;

    public BookServiceImpl(UserRepository userRepository, BookRepository bookRepository, BookItemRepository bookItemRepository, AuthorRepository authorRepository){
        super();
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
        this.bookItemRepository = bookItemRepository;
        this.authorRepository = authorRepository;
    }

    @Override
    public Book save(BookDto bookDto) {

        Set<Author> authors = new HashSet<>();
        for (Integer authorId :
                bookDto.getAuthorIds()) {
            authors.add(authorRepository.findByAuthorId(authorId));
        }

        Book book = new Book(bookDto.getBookTitle(), bookDto.getIsbnNumber(), bookDto.getPublisher(), bookDto.getLanguage(), bookDto.getNoOfPages(), authors);
        return bookRepository.save(book);
    }

    @Override
    public Boolean delete(Integer bookId) {
        Book book = bookRepository.findByBookId(bookId);
        try {
            bookRepository.delete(book);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    @Override
    public BookItem addBookItem(BookItemDto bookItemDto) {
        Book book = bookRepository.findByBookId(bookItemDto.getBookId());
        if(book == null){
            return null;
        }
        BookItem bookItem = new BookItem(book,bookItemDto.isReferenceOnly(), bookItemDto.getPrice(), bookItemDto.getStatus(), bookItemDto.getDateOfPurchase(), bookItemDto.getPublicationDate());
        return bookItemRepository.save(bookItem);

    }

    @Override
    public Boolean removeBookItem(Integer itemId) {

        try {
            bookItemRepository.delete(bookItemRepository.findByItemId(itemId));
            return true;
        }catch(Exception e){
            return false;
        }
    }
}
