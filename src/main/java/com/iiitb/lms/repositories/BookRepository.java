package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<Book, Integer> {

    @Query(value = "SELECT * FROM book b WHERE b.isbn_number =:isbnNumber", nativeQuery = true)
    Book findByIsbnNumber(@Param("isbnNumber") String isbnNumber);
}
