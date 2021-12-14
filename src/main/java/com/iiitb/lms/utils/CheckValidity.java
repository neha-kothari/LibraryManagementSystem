package com.iiitb.lms.utils;

import com.iiitb.lms.beans.BookReservation;
import com.iiitb.lms.repositories.BookReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class CheckValidity {

    @Autowired
    BookReservationRepository reservationRepository;


    public void markReservationStatus() {

        List<BookReservation> all = reservationRepository.getOldReservations();
        for (BookReservation currReservation : all) {
            currReservation.setReservationStatus(LMSConstants.BOOK_RESERVATION_STATUS_DELETED);
        }
        reservationRepository.saveAll(all);
    }
}
