package com.iiitb.lms.utils.transformers;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.iiitb.lms.beans.Author;
import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import com.iiitb.lms.beans.dto.BookDetailsDTO;
import com.iiitb.lms.beans.dto.BookDto;
import com.iiitb.lms.beans.dto.DashBoardBookDTO;
import com.iiitb.lms.repositories.AuthorRepository;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.repositories.BookRepository;
import com.iiitb.lms.repositories.UserRepository;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.*;

@Component
public class BookTransformer {

    @Resource
    private BookRepository bookRepository;

    @Resource
    private BookItemRepository bookItemRepository;

    @Resource
    private AuthorRepository authorRepository;


    public Book toEntity(Book book, BookDto request) {

        book.setBookTitle(request.getBookTitle());
        book.setIsbnNumber(request.getIsbnNumber());
        book.setPublisher(request.getPublisher());
        book.setLanguage(request.getLanguage());
        book.setNoOfPages(request.getNoOfPages());
        book.setYearOfPublish(request.getPublicationYear());
        book.setDelFlag(false);
        Set<Author> authors = new HashSet<>();
        for (String authorName : request.getAuthors()) {

            Author author = authorRepository.findByAuthorName(authorName.toUpperCase());

            if (author == null) {
                author = new Author();
                author.setAuthorName(authorName.toUpperCase());
                authorRepository.save(author);
            }
            authors.add(author);
        }
        book.setAuthors(authors);
        return book;
    }

    public List<BookDetailsDTO> getBooksList(List<Book> books) {
        List<BookDetailsDTO> listBooks = new ArrayList<>();
        for (Book book : books) {
            listBooks.add(toBookDetails(book));
        }
        return listBooks;
    }

    public List<String> getAuthorNames(Book book) {

        List<String> authorNames = new ArrayList<>();

        for (Author author : book.getAuthors()) {
            authorNames.add(author.getAuthorName());
        }
        return authorNames;
    }

    public BookDetailsDTO toBookDetails(Book book) {
        BookDetailsDTO bookDetailsDTO = new BookDetailsDTO();
        bookDetailsDTO.setBookId(book.getBookId());
        bookDetailsDTO.setBookTitle(book.getBookTitle());
        bookDetailsDTO.setLanguage(book.getLanguage());
        bookDetailsDTO.setIsbnNumber(book.getIsbnNumber());
        bookDetailsDTO.setPublisher(book.getPublisher());
        bookDetailsDTO.setPublicationYear(book.getYearOfPublish());
        bookDetailsDTO.setAuthors(getAuthorNames(book));
        bookDetailsDTO.setNoOfPages(book.getNoOfPages());
        int availableCopies = bookItemRepository.findBookItemByIsReferenceOnlyFalse(book.getBookId());
        bookDetailsDTO.setAvailableCopies(availableCopies);

        return bookDetailsDTO;
    }
}
