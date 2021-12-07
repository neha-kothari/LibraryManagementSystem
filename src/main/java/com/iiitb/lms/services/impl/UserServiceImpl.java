package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.BookLending;
import com.iiitb.lms.beans.Member;
import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.UserDetailsDTO;
import com.iiitb.lms.beans.dto.UserRegistrationDto;
import com.iiitb.lms.repositories.MemberRepository;
import com.iiitb.lms.repositories.UserRepository;
import com.iiitb.lms.services.UserService;
import com.iiitb.lms.utils.LMSConstants;
import com.iiitb.lms.utils.transformers.UserTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.time.temporal.ChronoUnit;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.concurrent.TimeUnit;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final MemberRepository memberRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Resource
    private UserTransformer userTransformer;

    @Autowired
    public UserServiceImpl(UserRepository userRepository, MemberRepository memberRepository) {
        super();
        this.userRepository = userRepository;
        this.memberRepository = memberRepository;
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
        if(user.getUserType()==2){
            Member member = new Member(user);
            Calendar today = Calendar.getInstance();
            today.set(Calendar.HOUR_OF_DAY, 0);
            member.setDateOfMembership(today.getTime());
            today.add(Calendar.YEAR, 4);
            member.setValidTillDate(today.getTime());
            memberRepository.save(member);
            return member;
        }
        user = userRepository.save(user);
        return user;
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

    @Override
    public float calculateUserFine(Member member) {
        float fine=0;
        for (BookLending bookLending:
             member.getBookLendings()) {
            if(bookLending.getStatus()==LMSConstants.BOOK_LENDING_STATUS_RETURNED){
                continue;
            }
            Calendar today = Calendar.getInstance();
            long diff = today.getTime().getTime() - bookLending.getDueDate().getTime();
            if(diff<=0){
                continue;
            }
            long noOfDaysPastDue = TimeUnit.DAYS.convert(diff, TimeUnit.MILLISECONDS);
            fine += LMSConstants.FINE_PER_DAY * noOfDaysPastDue;
        }
        return fine;
    }

    @Override
    public Member getMemberFromUserId(int id) {
        return memberRepository.findByUserId(id);
    }

}
