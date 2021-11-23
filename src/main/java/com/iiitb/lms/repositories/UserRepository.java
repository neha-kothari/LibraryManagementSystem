package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailAddress(String email);
    User findByUserId(int user_id);
}
