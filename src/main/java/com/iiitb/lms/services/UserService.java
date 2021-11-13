package com.iiitb.lms.services;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.UserRegistrationDto;
import com.iiitb.lms.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.management.relation.Role;
import java.util.Date;
import java.util.Collections;

@Service
public class UserService {


    private final UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmailAddress(username);
        if(user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmailAddress(), user.getPassword(), Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
    }

    public User save(UserRegistrationDto registrationDto) {
        User user = new User(registrationDto.getEmailAddress(), registrationDto.getUserType(), 'A', passwordEncoder.encode(registrationDto.getPassword()), registrationDto.getName(), registrationDto.getPhoneNumber());
        user.setAccountCreationDate(new Date());
        user.setLastLoginDateTime(new Date());
        return userRepository.save(user);
    }
}
