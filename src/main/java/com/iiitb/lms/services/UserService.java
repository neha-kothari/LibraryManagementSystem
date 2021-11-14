package com.iiitb.lms.services;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.UserRegistrationDto;
import org.springframework.security.core.userdetails.UserDetailsService;


public interface UserService extends UserDetailsService {
    User save(UserRegistrationDto registrationDto);

    User getUserFromUserId(int id);

}
