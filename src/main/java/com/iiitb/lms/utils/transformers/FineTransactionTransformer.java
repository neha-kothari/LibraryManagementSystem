package com.iiitb.lms.utils.transformers;

import com.iiitb.lms.beans.BookLending;
import com.iiitb.lms.beans.FineTransaction;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
import com.iiitb.lms.beans.dto.FineTransactionDTO;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.repositories.FineTransactionRepository;
import com.iiitb.lms.repositories.UserRepository;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class FineTransactionTransformer {

    public FineTransactionDTO toDTO(FineTransaction fineTransaction) {

        FineTransactionDTO fineTransactionDTO = new FineTransactionDTO();
        fineTransactionDTO.setFineId(fineTransaction.getFineId());
        fineTransactionDTO.setTransactionDate(fineTransaction.getTransactionDate());
        fineTransactionDTO.setFineAmount(fineTransaction.getFineAmount());
        fineTransactionDTO.setPaymentMode(fineTransaction.getPaymentMode());
        fineTransactionDTO.setOrderId(fineTransaction.getOrderId().getOrderId());
        fineTransactionDTO.setMemberId(fineTransaction.getOrderId().getMember().getUserId());
        fineTransactionDTO.setBookItemId(fineTransaction.getOrderId().getBookItem().getItemId());
        fineTransactionDTO.setStatus(fineTransaction.getStatus());

        return fineTransactionDTO;
    }

}
