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
    @Column(nullable = false, unique = true)
    private String isbnNumber;
    @Column(nullable = false)
    private String publisher;
    @Column
    private int yearOfPublish;
    @Column
    private String language;
    @Column
    private int noOfPages;
    @Column(columnDefinition = "BOOLEAN")
    private boolean delFlag;
    @ManyToMany
    @JoinTable(
            name = "book_author",
            joinColumns = @JoinColumn(name = "book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id"))
    Set<Author> authors;

    @OneToMany
    private List<BookItem> bookCopies;

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }



}
