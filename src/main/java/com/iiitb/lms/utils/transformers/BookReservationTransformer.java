package com.iiitb.lms.utils.transformers;

import com.iiitb.lms.beans.BookReservation;
import com.iiitb.lms.beans.dto.BookReservationRequestDTO;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.repositories.BookRepository;
import com.iiitb.lms.repositories.UserRepository;
import com.iiitb.lms.utils.LMSConstants;
import org.springframework.stereotype.Component;

import javax.annotation.Resource;

@Component
public class BookReservationTransformer {
    @Resource
    private BookRepository bookRepository;

    @Resource
    private UserRepository userRepository;

    @Resource
    private BookItemRepository bookItemRepository;

    public void toEntity(BookReservation bookReservation, BookReservationRequestDTO input) {

        bookReservation.setMember(userRepository.findByUserId(input.getMemberId()));
        bookReservation.setReservationStatus(LMSConstants.BOOK_STATUS_RESERVED);
        bookReservation.setBookItem(bookItemRepository.findByItemId(input.getBookItemId()));
        bookReservation.setReservationDate(input.getReservationDate());
        bookReservation.setValidityTill(input.getValidityTill());
    }

    public BookReservationRequestDTO toDTO(BookReservation bookReservation) {

        BookReservationRequestDTO bookReservationDTO = new BookReservationRequestDTO();
        bookReservationDTO.setReservationId(bookReservation.getReservationId());
        bookReservationDTO.setReservationDate(bookReservation.getReservationDate());
        bookReservationDTO.setBookItemId(bookReservation.getBookItem().getItemId());
        bookReservationDTO.setBookId(bookReservation.getBookItem().getBook().getBookId());
        bookReservationDTO.setMemberId(bookReservation.getMember().getUserId());
        bookReservationDTO.setValidityTill(bookReservation.getValidityTill());
        setReservationStatus(bookReservationDTO, bookReservation.getReservationStatus());
        return bookReservationDTO;
    }

    public void setReservationStatus(BookReservationRequestDTO bookReservationDTO, char status) {
        switch(status) {
            case 'R': {
                bookReservationDTO.setReservationStatus(LMSConstants.RESERVATION_STATUS_RESERVED);
                break;
            }
            case 'A': {
                bookReservationDTO.setReservationStatus(LMSConstants.RESERVATION_STATUS_APPROVED);
                break;
            }
            default:
                bookReservationDTO.setReservationStatus(LMSConstants.RESERVATION_STATUS_DENIED);
        }
    }
}
