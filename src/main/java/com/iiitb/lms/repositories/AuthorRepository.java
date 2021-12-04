package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Integer> {

    @Query(value = "SELECT * FROM author a WHERE a.author_name =:authorName", nativeQuery = true)
    Author findByAuthorName(@Param("authorName") String authorName);
}
