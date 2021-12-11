package com.iiitb.lms.utils.transformers;

import com.iiitb.lms.beans.BookLending;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
import com.iiitb.lms.beans.dto.BookReturnDetailsDTO;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.repositories.UserRepository;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class BookLendingTransformer {

    @Resource
    public UserRepository userRepository;
    @Resource
    public BookItemRepository bookItemRepository;


    public void toEntity(BookLending issueBook, BookIssueDetailsDTO request) {

        issueBook.setBookItem(bookItemRepository.findByItemId(request.getBookItemId()));
        issueBook.setIssuedBy(userRepository.findByUserId(request.getIssuedByUserId()));
        issueBook.setMember(userRepository.findByUserId(request.getMemberId()));
        issueBook.setIssueDate(request.getIssueDate());
        issueBook.setDueDate(request.getDueDate());
    }

    public BookIssueDetailsDTO toDTO(BookLending issueBook) {

        BookIssueDetailsDTO bookIssueDetailsDTO = new BookIssueDetailsDTO();
        bookIssueDetailsDTO.setBookId(issueBook.getBookItem().getBook().getBookId());
        bookIssueDetailsDTO.setBookItemId(issueBook.getBookItem().getItemId());
        bookIssueDetailsDTO.setIssuedByUserId(issueBook.getIssuedBy().getUserId());
        bookIssueDetailsDTO.setMemberId(issueBook.getMember().getUserId());
        bookIssueDetailsDTO.setOrderId(issueBook.getOrderId());
        bookIssueDetailsDTO.setStatus(getIssueStatusString(issueBook.getStatus()));
        bookIssueDetailsDTO.setIssueDate(issueBook.getIssueDate());
        bookIssueDetailsDTO.setDueDate(issueBook.getDueDate());
        return bookIssueDetailsDTO;
    }

    public BookReturnDetailsDTO toBookReturnDetailsDTO(BookLending returnBook) {

        BookReturnDetailsDTO bookReturnDetailsDTO = new BookReturnDetailsDTO();
        bookReturnDetailsDTO.setBookId(returnBook.getBookItem().getBook().getBookId());
        bookReturnDetailsDTO.setBookItemId(returnBook.getBookItem().getItemId());
        bookReturnDetailsDTO.setIssuedByUserId(returnBook.getIssuedBy().getUserId());
        bookReturnDetailsDTO.setMemberId(returnBook.getMember().getUserId());
        bookReturnDetailsDTO.setOrderId(returnBook.getOrderId());
        bookReturnDetailsDTO.setStatus(getIssueStatusString(returnBook.getStatus()));
        bookReturnDetailsDTO.setIssueDate(returnBook.getIssueDate());
        bookReturnDetailsDTO.setDueDate(returnBook.getDueDate());
        return bookReturnDetailsDTO;
    }

    public String getIssueStatusString(char status) {
        switch (status) {
            case 'B':
                return "Borrowed";
            case 'R':
                return "Returned";
            case 'L':
                return "Lost";
        }
        return null;
    }


}
