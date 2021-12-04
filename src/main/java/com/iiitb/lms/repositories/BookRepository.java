package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Integer> {
    Book findByBookId(Integer bookID);
}
