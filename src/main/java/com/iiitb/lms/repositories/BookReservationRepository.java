package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.BookReservation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookReservationRepository extends JpaRepository<BookReservation, Integer> {
}
