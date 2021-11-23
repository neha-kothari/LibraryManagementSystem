package com.iiitb.lms.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@Entity
public class Author {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int authorId;
    private String authorName;
    private String description;

    @ManyToMany(mappedBy = "authors")
    Set<Book> books;

    public Author(String authorName, String description) {
        this.authorName = authorName;
        this.description = description;
    }

}
