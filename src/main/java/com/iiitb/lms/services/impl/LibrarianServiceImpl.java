package com.iiitb.lms.services.impl;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.UserDetailsDTO;
import com.iiitb.lms.repositories.UserRepository;
import com.iiitb.lms.services.LibrarianService;
import com.iiitb.lms.utils.LMSConstants;
import com.iiitb.lms.utils.transformers.UserTransformer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.List;

@Service
public class LibrarianServiceImpl implements LibrarianService {

    @Autowired
    private UserRepository userRepository;

    @Resource
    private UserTransformer userTransformer;


    @Override
    public UserDetailsDTO blockMember(int user_id) throws Exception {

        User member = userRepository.findByUserId(user_id);
        if (validateRequest(member, LMSConstants.ACCOUNT_STATUS_ACTIVE)) {
            member.setAccountStatus(LMSConstants.ACCOUNT_STATUS_BLOCKED);
            userRepository.save(member);
        } else {
            throw new Exception("Invalid Block Member Request!");
        }

        return userTransformer.toUserDetailsDTO(member);
    }

    private boolean validateRequest(User member, char accountStatus) {

        return member.getUserType() == 2 && member.getAccountStatus() == accountStatus;
    }

    @Override
    public UserDetailsDTO unblockMember(int user_id) throws Exception {

        User member = userRepository.findByUserId(user_id);
        if (validateRequest(member, LMSConstants.ACCOUNT_STATUS_BLOCKED)) {
            member.setAccountStatus(LMSConstants.ACCOUNT_STATUS_ACTIVE);
            userRepository.save(member);
        } else {
            throw new Exception("Invalid Unblock Member Request!");
        }

        return userTransformer.toUserDetailsDTO(member);

    }

    @Override
    public void issueBook() {

    }

    @Override
    public void returnBook() {

    }

    @Override
    public List<UserDetailsDTO> getStudents() {

        List<User> students = userRepository.getStudents();
        if (students == null || students.size() == 0) {
            return new ArrayList<>();
        }

        List<UserDetailsDTO> studentsList = new ArrayList<>();
        for (User student : students) {
            studentsList.add(userTransformer.toUserDetailsDTO(student));
        }
        return studentsList;
    }
}
