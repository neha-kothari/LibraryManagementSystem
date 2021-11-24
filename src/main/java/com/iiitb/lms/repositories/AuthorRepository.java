package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.Author;
import com.iiitb.lms.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AuthorRepository extends JpaRepository<Author, Integer> {
    Author findByAuthorId(Integer authorId);
}
