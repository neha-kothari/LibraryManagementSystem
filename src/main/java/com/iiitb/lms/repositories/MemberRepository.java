package com.iiitb.lms.repositories;

import com.iiitb.lms.beans.Member;
import com.iiitb.lms.beans.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByUserId(int user_id);
}
