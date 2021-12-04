package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import com.iiitb.lms.beans.dto.BookDto;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.services.BookItemService;
import com.iiitb.lms.utils.LMSConstants;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;

@Service
public class BookItemServiceImpl implements BookItemService {

    @Resource
    public BookItemRepository bookItemRepository;

    @Override
    public BookItem addBookItem(BookDto request, Book book) {

        BookItem bookItem = new BookItem();
        bookItem.setBook(book);
        bookItem.setDateOfPurchase(request.getDateOfPurchase());
        bookItem.setIsReferenceOnly(request.isReferenceOnly());

        bookItem.setPrice(request.getPrice());
        bookItem.setStatus(LMSConstants.BOOK_STATUS_AVAILABLE);
        bookItemRepository.save(bookItem);
        return bookItem;
    }
}
