package com.iiitb.lms.services;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.repositories.BookItemRepository;
import com.iiitb.lms.repositories.BookRepository;

public class BookServiceImpl implements BookService{

    private BookRepository bookRepository;
    private BookItemRepository bookItemRepository;

    public BookServiceImpl(BookRepository bookRepository, BookItemRepository bookItemRepository){
        super();
        this.bookRepository = bookRepository;
        this.bookItemRepository = bookItemRepository;
    }

    @Override
    public Book save(BookDto bookDto) {
        String useremail = SecurityContextHolder.getContext().getAuthentication().getName();
        User creatingUser = userRepository.findByEmail(useremail);
        Trip trip = new Trip(creatingUser, tripCreationDto.getDestination(), tripCreationDto.getLandscape(), tripCreationDto.getTripDate(), tripCreationDto.getTripLength(), tripCreationDto.getTripBudget(), tripCreationDto.getGroupSize(), tripCreationDto.getExpectedAgeGroup(), tripCreationDto.getExpectedGender(), tripCreationDto.getDescription(), new Timestamp(new java.util.Date().getTime()));

        return tripRepository.save(trip);

        Book book = new Book();
    }

    @Override
    public Boolean delete(Book book) {
        return null;
    }

    @Override
    public Boolean addBookItem(BookItemDto bookItemDto) {
        return null;
    }

    @Override
    public Boolean removeBookItem(Integer itemId) {
        return null;
    }
}
