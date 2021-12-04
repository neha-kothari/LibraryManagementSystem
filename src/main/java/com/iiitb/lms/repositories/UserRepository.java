package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailAddress(String email);
    User findByUserId(int user_id);

    @Query(value = "SELECT * FROM user u WHERE user_type = 2", nativeQuery = true)
    List<User> getStudents();
}
