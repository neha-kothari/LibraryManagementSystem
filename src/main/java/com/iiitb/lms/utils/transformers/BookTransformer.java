package com.iiitb.lms.utils.transformers;

import com.iiitb.lms.beans.Author;
import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.dto.BookDto;
import com.iiitb.lms.repositories.AuthorRepository;
import com.iiitb.lms.repositories.BookRepository;
import com.iiitb.lms.repositories.UserRepository;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;
import java.util.HashSet;
import java.util.Locale;
import java.util.Set;

@Component
public class BookTransformer {

    @Resource
    private BookRepository bookRepository;

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

}
