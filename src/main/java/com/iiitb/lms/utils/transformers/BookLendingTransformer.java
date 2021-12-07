package com.iiitb.lms.utils.transformers;

import com.iiitb.lms.beans.BookLending;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
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
        setIssueStatus(issueBook.getStatus(), bookIssueDetailsDTO);
        bookIssueDetailsDTO.setIssueDate(issueBook.getIssueDate());
        bookIssueDetailsDTO.setDueDate(issueBook.getDueDate());
        return bookIssueDetailsDTO;
    }

    public void setIssueStatus(char status, BookIssueDetailsDTO bookIssueDetailsDTO) {
        switch (status) {
            case 'B':
                bookIssueDetailsDTO.setStatus("Borrowed");
                break;
            case 'R':
                bookIssueDetailsDTO.setStatus("Returned");
                break;
            case 'L':
                bookIssueDetailsDTO.setStatus("Lost");
                break;
        }
    }
}
