package com.iiitb.lms.beans.dto;

import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
public class UserDetailsDTO {

    private int userId;
    private String emailAddress;
    private String userType;
    private String accountStatus;
    private String name;
    private String phoneNumber;
    private Date accountCreationDate;
    private Date lastLoginDateTime;
    private String error;
}
