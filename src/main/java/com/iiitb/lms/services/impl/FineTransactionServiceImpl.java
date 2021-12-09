package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.*;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
import com.iiitb.lms.beans.dto.FineTransactionDTO;
import com.iiitb.lms.repositories.*;
import com.iiitb.lms.utils.LMSConstants;
import com.iiitb.lms.utils.transformers.BookLendingTransformer;
import com.iiitb.lms.utils.transformers.FineTransactionTransformer;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Calendar;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
public class FineTransactionServiceImpl extends BookReturnServiceImpl {

    @Resource
    public UserRepository userRepository;

    @Resource
    public BookItemRepository bookItemRepository;

    @Resource
    public BookLendingRepository issuedBooksRepository;

    @Resource
    public FineTransactionRepository fineTransactionRepository;

    @Resource
    public FineTransactionTransformer fineTransactionTransformer;

    FineTransactionDTO request;

    @Override
    void verifyRequest(Object inputDetails) throws Exception {

        request = (FineTransactionDTO) inputDetails;
        super.verifyUserRequest(request.getMemberId(), request.getOrderId());

    }

    @Override
    Object processRequest(Object inputDetails) {

        request = (FineTransactionDTO) inputDetails;
        BookLending issuedBookOrder = issuedBooksRepository.findBookLendingByOrderId(request.getOrderId());
        request.setBookItemId(issuedBookOrder.getBookItem().getItemId());

        if(request.getFineAmount()<=0){
            request.setError("Member has no outstanding fine");
            return request;
        }
        FineTransaction fineTransaction = createFineTransaction(issuedBookOrder, request.getFineAmount(), request.getPaymentMode());

        if(issuedBookOrder.getStatus()==LMSConstants.BOOK_LEND_STATUS_LOST){
            issuedBookOrder.setStatus(LMSConstants.BOOK_LEND_STATUS_FINE_PAID);
            issuedBooksRepository.save(issuedBookOrder);
        }else{
            super.returnBookSuccessfully(issuedBookOrder);
        }

        return fineTransactionTransformer.toDTO(fineTransaction);
    }

    private FineTransaction createFineTransaction(BookLending issuedBookOrder, float fine, String paymentMode) {
        FineTransaction fineTransaction = new FineTransaction();
        fineTransaction.setOrderId(issuedBookOrder);
        fineTransaction.setTransactionDate(new Date());
        fineTransaction.setPaymentMode(paymentMode);
        fineTransaction.setStatus(LMSConstants.FINE_TRANSACTION_STATUS_COMPLETE);
        fineTransaction.setFineAmount(fine);

        fineTransactionRepository.save(fineTransaction);

        issuedBookOrder.setFine(fineTransaction);
        issuedBooksRepository.save(issuedBookOrder);

        return fineTransaction;

    }


}
