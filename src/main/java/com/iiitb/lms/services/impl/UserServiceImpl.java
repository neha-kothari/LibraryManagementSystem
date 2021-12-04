package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.UserDetailsDTO;
import com.iiitb.lms.beans.dto.UserRegistrationDto;
import com.iiitb.lms.repositories.UserRepository;
import com.iiitb.lms.services.UserService;
import com.iiitb.lms.utils.transformers.UserTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.Collections;
import java.util.Date;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Resource
    private UserTransformer userTransformer;

    @Autowired
    public UserServiceImpl(UserRepository userRepository) {
        super();
        this.userRepository = userRepository;
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User user = userRepository.findByEmailAddress(username);
        if(user == null) {
            throw new UsernameNotFoundException("Invalid username or password.");
        }
        return new org.springframework.security.core.userdetails.User(user.getEmailAddress(), user.getPassword(), Collections.singleton(new SimpleGrantedAuthority("ROLE_USER")));
    }

    @Override
    public User save(UserRegistrationDto registrationDto) {
        User user = new User(registrationDto.getEmailAddress(), registrationDto.getUserType(), 'A', passwordEncoder.encode(registrationDto.getPassword()), registrationDto.getName(), registrationDto.getPhoneNumber());
        user.setAccountCreationDate(new Date());
        user.setLastLoginDateTime(new Date());
        return userRepository.save(user);
    }

    @Override
    public User getUserFromEmailId(String username) {
        return userRepository.findByEmailAddress(username);
    }

    @Override
    public User getUserFromUserId(int id) {
        return userRepository.findById(id).orElse(null);
    }

    @Override
    public UserDetailsDTO getUserDetails(String email) {

        User user = getUserFromEmailId(email);
        if (user == null) {
            return null;
        }
        return userTransformer.toUserDetailsDTO(user);
    }

}