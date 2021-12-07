package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookItemRepository extends JpaRepository<BookItem, Integer> {

    BookItem findByItemId(Integer bookItemId);

    @Query(value = "SELECT count(*) FROM book_item b WHERE b.book_id =:bookId AND status = 'A'", nativeQuery = true)
    Integer findBookItemByIsReferenceOnlyFalse(@Param("bookId") Integer bookId);

}
