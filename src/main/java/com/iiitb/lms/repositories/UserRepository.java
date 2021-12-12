package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByEmailAddress(String email);
    User findByUserId(int user_id);

    @Query(value = "SELECT u.*,m.*, 1 as clazz_ FROM user u LEFT OUTER JOIN member m on u.user_id=m.user_id WHERE u.user_type = 2", nativeQuery = true)
    List<User> getStudents();
}
