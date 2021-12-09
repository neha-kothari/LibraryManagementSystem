package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookLending;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookLendingRepository extends JpaRepository<BookLending, Integer> {

    @Query(value = "SELECT count(*) FROM book_lending l WHERE l.member_id =:userId AND status = 'B'", nativeQuery = true)
    Integer countCurrentIssuedBooks(@Param("userId") Integer userId);

    BookLending findBookLendingByOrderId(int orderId);
}
