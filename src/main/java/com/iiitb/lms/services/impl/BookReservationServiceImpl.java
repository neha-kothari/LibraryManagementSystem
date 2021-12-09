package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import com.iiitb.lms.beans.BookReservation;
import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
import com.iiitb.lms.beans.dto.BookReservationRequestDTO;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.repositories.BookRepository;
import com.iiitb.lms.repositories.BookReservationRepository;
import com.iiitb.lms.utils.LMSConstants;
import com.iiitb.lms.utils.transformers.BookReservationTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;

@Service
public class BookReservationServiceImpl extends AbstractBookItemService {

    @Autowired
    private BookReservationRepository bookReservationRepo;

    @Autowired
    private BookRepository bookRepository;

    @Autowired
    private BookItemRepository itemRepository;

    @Resource
    private BookReservationTransformer bookReservationTransformer;

    BookReservationRequestDTO input;

    @Override
    void verifyRequest(Object inputDetails) throws Exception {

        input = (BookReservationRequestDTO) inputDetails;

        if (!validateUserRequest(input.getMemberId())) {
            throw new Exception("Member has 5 book reservations already.");
        }

        int bookItemAvailable = validateBookAvailability(input.getBookId());
        if (bookItemAvailable == -1) {
            throw new Exception("Selected book is not available for reservation.");
        }

        input.setBookItemId(bookItemAvailable);
    }

    private int validateBookAvailability(int bookId) throws Exception {

        Book book = bookRepository.findByBookId(bookId);

        if (null == book || book.isDelFlag() || null == book.getBookCopies() || book.getBookCopies().size() == 0) {
            throw new Exception("The book cannot be issued.");
        }

        BookItem bookItem = book.getBookCopies().get(0);

        if (bookItem.getIsReferenceOnly()) {
            throw new Exception("The book is for reference only and cannot be issued.");
        }

        for (BookItem copy : book.getBookCopies()) {
            if (copy.getStatus() == LMSConstants.BOOK_STATUS_AVAILABLE) {
                input.setBookItemId(copy.getItemId());
                return copy.getItemId();
            }
        }
        return -1;
    }

    private boolean validateUserRequest(int memberId) {

        int count  = bookReservationRepo.countCurrentBookReservations(memberId);
        if (count == LMSConstants.MAX_NO_OF_RESERVATIONS) {
            return false;
        }
        return true;
    }

    @Override
    BookReservationRequestDTO processRequest(Object inputDetails) {

        BookItem bookItem = itemRepository.findByItemId(input.getBookItemId());
        bookItem.setStatus(LMSConstants.BOOK_STATUS_RESERVED);
        itemRepository.save(bookItem);

        input = (BookReservationRequestDTO) inputDetails;
        Date currentDate =  new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        input.setReservationDate(new Date(c.getTimeInMillis()));
        c.add(Calendar.DATE, LMSConstants.RESERVE_DAYS);
        input.setValidityTill(new Date(c.getTimeInMillis()));

        BookReservation bookReservation = new BookReservation();
        bookReservationTransformer.toEntity(bookReservation, input);
        bookReservationRepo.save(bookReservation);
        return bookReservationTransformer.toDTO(bookReservation);
    }

    public void deleteRequest(User user, int reservationID) throws Exception {

        BookReservation reservation = bookReservationRepo.findByReservationId(reservationID);
        if (reservation != null && reservation.getMember().getUserId() != user.getUserId()) {
            throw new Exception("User cannot delete this reservation!");
        }

        BookItem bookItem = reservation.getBookItem();
        bookItem.setStatus(LMSConstants.BOOK_STATUS_AVAILABLE);
        itemRepository.save(bookItem);

        reservation.setDelFlag(true);
        bookReservationRepo.save(reservation);

    }

    public BookIssueDetailsDTO approveRequest(User user, int reservationID) throws Exception {

        BookReservation reservation = bookReservationRepo.findByReservationId(reservationID);
        if (reservation != null && reservation.getMember().getUserId() != user.getUserId()) {
            throw new Exception("User cannot approve this reservation!");
        }
        reservation.setReservationStatus(LMSConstants.BOOK_RESERVATION_STATUS_APPROVED);
        bookReservationRepo.save(reservation);

        BookIssueDetailsDTO issueRequest = new BookIssueDetailsDTO();
        issueRequest.setBookItemId(reservation.getBookItem().getItemId());
        issueRequest.setMemberId(user.getUserId());
        return issueRequest;
    }
}
