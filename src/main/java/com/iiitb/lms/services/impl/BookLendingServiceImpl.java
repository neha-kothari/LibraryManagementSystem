package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.BookItem;
import com.iiitb.lms.beans.BookLending;
import com.iiitb.lms.beans.BookReservation;
import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
import com.iiitb.lms.beans.dto.BookReservationRequestDTO;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.repositories.BookLendingRepository;
import com.iiitb.lms.repositories.UserRepository;
import com.iiitb.lms.utils.LMSConstants;
import com.iiitb.lms.utils.transformers.BookLendingTransformer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;

@Service
public class BookLendingServiceImpl extends AbstractBookItemService {

    @Resource
    public UserRepository userRepository;

    @Resource
    public BookItemRepository bookItemRepository;

    @Resource
    public BookLendingRepository issuedBooksRepository;

    @Resource
    public BookLendingTransformer bookLendingTransformer;

    BookIssueDetailsDTO request;
    @Override
    void verifyRequest(Object inputDetails) throws Exception {

        request = (BookIssueDetailsDTO) inputDetails;
        verifyUserRequest(request.getMemberId());
        verifyBookItemAvailability(request.getBookItemId());

    }

    private void verifyBookItemAvailability(int bookItemId) throws Exception {

        BookItem bookItem = bookItemRepository.findByItemId(bookItemId);
        if (bookItem.getIsReferenceOnly() || bookItem.getStatus() != LMSConstants.BOOK_STATUS_AVAILABLE) {
            throw new Exception("This Book Item is not available!");
        }
    }

    private void verifyUserRequest(int memberId) throws Exception {

        User member = userRepository.findByUserId(memberId);
        if (member == null || member.getAccountStatus() == LMSConstants.ACCOUNT_STATUS_BLOCKED) {
            throw new Exception("Member id not allowed to issue books.");
        }
        int currIssuedBooks = issuedBooksRepository.countCurrentIssuedBooks(memberId);

        if (currIssuedBooks == LMSConstants.MAX_NO_OF_ISSUES) {
            throw new Exception("Member has already issued maximum number of books.");
        }
    }

    @Override
    Object processRequest(Object inputDetails) {

        request = (BookIssueDetailsDTO) inputDetails;

        BookItem bookItem = bookItemRepository.findByItemId(request.getBookItemId());
        bookItem.setStatus(LMSConstants.BOOK_STATUS_ISSUED);
        bookItemRepository.save(bookItem);

        Date currentDate =  new Date();
        Calendar c = Calendar.getInstance();
        c.setTime(currentDate);
        request.setIssueDate(new Date(c.getTimeInMillis()));
        c.add(Calendar.DATE, LMSConstants.ISSUE_DAYS);
        request.setDueDate(new Date(c.getTimeInMillis()));

        BookLending issueBook = new BookLending();
        bookLendingTransformer.toEntity(issueBook, request);
        issueBook.setStatus(LMSConstants.BOOK_LEND_STATUS_BORROWED);
        issuedBooksRepository.save(issueBook);

        return bookLendingTransformer.toDTO(issueBook);
    }
}
