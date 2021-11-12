package com.iiitb.lms.author;

import javax.persistence.Entity;
import javax.persistence.Id;

@Entity
public class Author {

    @Id
    private int authorId;
    private String authorName;
    private String description;

    public Author() {
    }

    public Author(String authorName, String description) {
        this.authorName = authorName;
        this.description = description;
    }

    public int getAuthorId() {
        return authorId;
    }

    public void setAuthorId(int authorId) {
        this.authorId = authorId;
    }

    public String getAuthorName() {
        return authorName;
    }

    public void setAuthorName(String authorName) {
        this.authorName = authorName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
