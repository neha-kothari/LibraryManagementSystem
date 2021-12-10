package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.*;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
import com.iiitb.lms.beans.dto.BookReturnDetailsDTO;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.repositories.BookLendingRepository;
import com.iiitb.lms.repositories.MemberRepository;
import com.iiitb.lms.repositories.UserRepository;
import com.iiitb.lms.utils.LMSConstants;
import com.iiitb.lms.utils.transformers.BookLendingTransformer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
public class BookReturnServiceImpl extends AbstractBookItemService {

    @Resource
    public UserRepository userRepository;

    @Resource
    public MemberRepository memberRepository;

    @Resource
    public BookItemRepository bookItemRepository;

    @Resource
    public BookLendingRepository issuedBooksRepository;

    @Resource
    public BookLendingTransformer bookLendingTransformer;

    BookReturnDetailsDTO request;
    @Override
    void verifyRequest(Object inputDetails) throws Exception {

        request = (BookReturnDetailsDTO) inputDetails;
        verifyUserRequest(request.getMemberId(), request.getOrderId());

    }

    protected void verifyUserRequest(int memberId, int orderId) throws Exception {

        Member member = memberRepository.findByUserId(memberId);
        BookLending issuedBookOrder = issuedBooksRepository.findBookLendingByOrderId(orderId);
        if (member == null || issuedBookOrder==null) {
            throw new Exception("Incorrect request");
        }
        if(issuedBookOrder.getMember().getUserId()!=memberId) {
            throw new Exception("Member had not issued that book item");
        }
        if(issuedBookOrder.getStatus()==LMSConstants.BOOK_LEND_STATUS_RETURNED){
            throw new Exception("Book Item has been already returned");
        }

    }

    @Override
    Object processRequest(Object inputDetails) {

        request = (BookReturnDetailsDTO) inputDetails;
        BookLending issuedBookOrder = issuedBooksRepository.findBookLendingByOrderId(request.getOrderId());
        request.setBookItemId(issuedBookOrder.getBookItem().getItemId());

        float fine = 0;
        if(request.getStatus().equals(String.valueOf(LMSConstants.BOOK_LEND_STATUS_LOST))){
            if(issuedBookOrder.getStatus()==LMSConstants.BOOK_LEND_STATUS_FINE_PAID){
                request.setFine(0);
                request.setError("Fine already paid for losing the book");
                return request;
            }
            if(issuedBookOrder.getStatus()!=LMSConstants.BOOK_LEND_STATUS_LOST){
                markBookLost(issuedBookOrder);
            }
            fine = calculateFine(issuedBookOrder);
            request.setFine(fine);
            request.setError("Member needs to pay the fine for losing the book");
            return request;
        }
        fine = calculateFine(issuedBookOrder);
        if(fine>0){
            request.setFine(fine);
            request.setStatus(String.valueOf(LMSConstants.BOOK_LEND_STATUS_BORROWED));
            request.setError("Member needs to pay outstanding fine for this book first");
            return request;
        }

        returnBookSuccessfully(issuedBookOrder);

        return bookLendingTransformer.toBookReturnDetailsDTO(issuedBookOrder);
    }

    float calculateFine(BookLending issuedBookOrder){
        FineTransaction fineTransaction = issuedBookOrder.getFine();
        float fine = 0;
        if(fineTransaction!=null && fineTransaction.getStatus()==LMSConstants.FINE_TRANSACTION_STATUS_COMPLETE){
            return 0;
        }
        if(issuedBookOrder.getStatus()==LMSConstants.BOOK_LEND_STATUS_LOST){
            fine += issuedBookOrder.getBookItem().getPrice();
        }
        Calendar today = Calendar.getInstance();
        long diff = today.getTime().getTime() - issuedBookOrder.getDueDate().getTime();
        if(diff<=0){
            return fine;
        }
        long noOfDaysPastDue = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
        fine += LMSConstants.FINE_PER_DAY * noOfDaysPastDue;
        return fine;
    }

    protected void returnBookSuccessfully(BookLending issuedBookOrder) {
        issuedBookOrder.setReturnDate(new Date());
        issuedBookOrder.setStatus(LMSConstants.BOOK_LEND_STATUS_RETURNED);
        issuedBooksRepository.save(issuedBookOrder);
        updateBookItemStatus(issuedBookOrder.getBookItem().getItemId(), LMSConstants.BOOK_STATUS_AVAILABLE);
    }

    protected void markBookLost(BookLending issuedBookOrder) {
        issuedBookOrder.setStatus(LMSConstants.BOOK_LEND_STATUS_LOST);
        issuedBooksRepository.save(issuedBookOrder);
        updateBookItemStatus(issuedBookOrder.getBookItem().getItemId(), LMSConstants.BOOK_STATUS_LOST);
    }

    protected void updateBookItemStatus(int bookItemId, char status){
        BookItem bookItem = bookItemRepository.findByItemId(bookItemId);
        bookItem.setStatus(status);
        bookItemRepository.save(bookItem);
    }

}
