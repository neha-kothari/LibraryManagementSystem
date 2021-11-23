package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookItemRepository extends JpaRepository<BookItem, Integer> {
    BookItem findByItemId(Integer itemID);
}
