package com.iiitb.lms.utils.transformers;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.UserDetailsDTO;
import org.springframework.stereotype.Component;

@Component
public class UserTransformer {

    public UserDetailsDTO toUserDetailsDTO(User user) {

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setUserId(user.getUserId());
        userDetailsDTO.setUserType(getUserType(user.getUserType()));
        userDetailsDTO.setAccountStatus(getMemberAccountStatus(user.getAccountStatus()));
        userDetailsDTO.setName(user.getName());
        userDetailsDTO.setEmailAddress(user.getEmailAddress());
        userDetailsDTO.setPhoneNumber(user.getPhoneNumber());
        userDetailsDTO.setAccountCreationDate(user.getAccountCreationDate());
        userDetailsDTO.setLastLoginDateTime(user.getLastLoginDateTime());
        return userDetailsDTO;
    }

    private String getUserType(int userType) {
        if (userType == 1) {
            return "Librarian";
        } else {
            return "Member";
        }
    }

    private String getMemberAccountStatus(char accountStatus) {
        switch(accountStatus) {
            case 'A':
                return "Active";
            case 'B':
                return "Blocked";
            case 'I':
                return "Inactive";
            default:
                return "Invalid";
        }
    }
}
