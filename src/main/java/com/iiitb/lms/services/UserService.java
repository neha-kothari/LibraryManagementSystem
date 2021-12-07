package com.iiitb.lms.services;

import com.iiitb.lms.beans.Member;
import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.UserDetailsDTO;
import com.iiitb.lms.beans.dto.UserRegistrationDto;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface UserService extends UserDetailsService {
    User save(UserRegistrationDto registrationDto);

    User getUserFromUserId(int id);
    User getUserFromEmailId(String username);
    UserDetailsDTO getUserDetails(String email);
    float calculateUserFine(Member member);
    Member getMemberFromUserId(int id);



}
