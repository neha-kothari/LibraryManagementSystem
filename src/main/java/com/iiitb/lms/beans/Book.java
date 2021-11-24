package com.iiitb.lms.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer bookId;
    @Column(nullable = false)
    private String bookTitle;
    @Column(nullable = false)
    private String isbnNumber;
    @Column(nullable = false)
    private String publisher;
    @Column
    private String language;
    private int noOfPages;
    @ManyToMany
    @JoinTable(
            name = "book_author",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id"))
    Set<Author> authors;

    @OneToMany(mappedBy = "book", cascade = CascadeType.ALL)
    private List<BookItem> bookItemList;

    public Book(String bookTitle, String isbnNumber, String publisher, String language, int noOfPages, Set<Author> authors) {
        this.bookTitle = bookTitle;
        this.isbnNumber = isbnNumber;
        this.publisher = publisher;
        this.language = language;
        this.noOfPages = noOfPages;
        this.authors = authors;
    }

}
