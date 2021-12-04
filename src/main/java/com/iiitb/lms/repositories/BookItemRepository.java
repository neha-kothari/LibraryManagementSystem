package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.BookItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookItemRepository extends JpaRepository<BookItem, Integer> {
}
