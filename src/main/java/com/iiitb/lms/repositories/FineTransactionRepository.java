package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.BookLending;
import com.iiitb.lms.beans.FineTransaction;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface FineTransactionRepository extends JpaRepository<FineTransaction, Integer> {

}
