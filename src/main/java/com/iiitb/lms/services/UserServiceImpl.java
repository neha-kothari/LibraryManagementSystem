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

import java.util.Collections;
import java.util.Date;

@Service
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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
    public User getUserFromUserId(int id) {
        return userRepository.findById(id).orElse(null);
    }

}
