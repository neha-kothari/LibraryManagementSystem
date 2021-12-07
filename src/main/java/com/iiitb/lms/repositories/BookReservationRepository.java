package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.BookReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BookReservationRepository extends JpaRepository<BookReservation, Integer> {

    @Query(value = "SELECT count(*) FROM book_reservation r WHERE r.user_id =:userId AND reservation_status = 'R' AND del_flag = false", nativeQuery = true)
    Integer countCurrentBookReservations(@Param("userId") Integer userId);

    BookReservation findByReservationId(Integer reservationId);
}
