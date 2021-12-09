package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.BookLending;
import com.iiitb.lms.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookLendingRepository extends JpaRepository<BookLending, Integer> {

    @Query(value = "SELECT count(*) FROM book_lending l WHERE l.member_id =:userId AND status = 'B'", nativeQuery = true)
    Integer countCurrentIssuedBooks(@Param("userId") Integer userId);

    BookLending findBookLendingByOrderId(int orderId);

    List<BookLending> findAllByMember(User user);
}
