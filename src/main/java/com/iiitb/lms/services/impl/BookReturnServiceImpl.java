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

        float fine = calculateFine(issuedBookOrder);
        if(request.getStatus().equals(String.valueOf(LMSConstants.BOOK_LEND_STATUS_LOST))){
            fine += issuedBookOrder.getBookItem().getPrice();
            markBookLost(issuedBookOrder);
            request.setFine(fine);
            request.setError("Member needs to pay the fine for losing the book");
            return request;
        }
        if(fine>0){
            request.setFine(fine);
            request.setError("Member needs to pay outstanding fine for this book first");
            return request;
        }

        returnBookSuccessfully(issuedBookOrder);

        return bookLendingTransformer.toBookReturnDetailsDTO(issuedBookOrder);
    }

    float calculateFine(BookLending issuedBookOrder){
        FineTransaction fineTransaction = issuedBookOrder.getFine();
        if(fineTransaction!=null && fineTransaction.getStatus()==LMSConstants.FINE_TRANSACTION_STATUS_COMPLETE){
            return 0;
        }
        Calendar today = Calendar.getInstance();
        long diff = today.getTime().getTime() - issuedBookOrder.getDueDate().getTime();
        if(diff<=0){
            return 0;
        }
        long noOfDaysPastDue = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
        float fine = LMSConstants.FINE_PER_DAY * noOfDaysPastDue;
        return fine;
    }

    protected void returnBookSuccessfully(BookLending issuedBookOrder) {
        issuedBookOrder.setReturnDate(new Date());
        issuedBookOrder.setStatus(LMSConstants.BOOK_LEND_STATUS_RETURNED);
        issuedBooksRepository.save(issuedBookOrder);

        BookItem bookItem = bookItemRepository.findByItemId(request.getBookItemId());
        bookItem.setStatus(LMSConstants.BOOK_STATUS_AVAILABLE);
        bookItemRepository.save(bookItem);
    }

    protected void markBookLost(BookLending issuedBookOrder) {
        issuedBookOrder.setStatus(LMSConstants.BOOK_LEND_STATUS_LOST);
        issuedBooksRepository.save(issuedBookOrder);

        BookItem bookItem = bookItemRepository.findByItemId(request.getBookItemId());
        bookItem.setStatus(LMSConstants.BOOK_STATUS_LOST);
        bookItemRepository.save(bookItem);
    }

}
