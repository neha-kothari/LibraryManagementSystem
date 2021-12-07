package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import com.iiitb.lms.beans.BookReservation;
import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookReservationRequestDTO;
import com.iiitb.lms.repositories.BookRepository;
import com.iiitb.lms.repositories.BookReservationRepository;
import com.iiitb.lms.repositories.UserRepository;
import com.iiitb.lms.utils.LMSConstants;
import com.iiitb.lms.utils.transformers.BookReservationTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;

@Service
public class BookReservationServiceImpl extends AbstractBookItemService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BookReservationRepository bookReservationRepo;

    @Autowired
    private BookRepository bookRepository;

    @Resource
    private BookReservationTransformer bookReservationTransformer;

    BookReservationRequestDTO input;

    @Override
    void verifyRequest(Object inputDetails) throws Exception {

        input = (BookReservationRequestDTO) inputDetails;

        if (!validateUserTypeAndStatus(input.getMemberId())) {
            throw new Exception("Member cannot reserve book.");
        }

        int bookItemAvailable = validateBookAvailability(input.getBookId());
        if (bookItemAvailable == -1) {
            throw new Exception("Selected book is not available for reservation.");
        }

        input.setBookId(bookItemAvailable);
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

    private boolean validateUserTypeAndStatus(int memberId) {

        User user = userRepository.findByUserId(memberId);
        if (user.getUserType() != LMSConstants.USER_TYPE_MEMBER || user.getAccountStatus() != LMSConstants.ACCOUNT_STATUS_ACTIVE) {
            return false;
        }
        return true;
    }

    @Override
    BookReservationRequestDTO processRequest(Object inputDetails) {

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
}
