package com.iiitb.lms.beans.dto;

public class UserRegistrationDto {
    private int userType;
    private String emailAddress;
    private String password;
    private String name;
    private String phoneNumber;

    public UserRegistrationDto(){}

    public UserRegistrationDto(int userType, String emailAddress, String password, String name, String phoneNumber) {
        super();
        this.userType = userType;
        this.emailAddress = emailAddress;
        this.password = password;
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    public int getUserType() {
        return userType;
    }

    public void setUserType(int userType) {
        this.userType = userType;
    }

    public String getEmailAddress() {
        return emailAddress;
    }

    public void setEmailAddress(String emailAddress) {
        this.emailAddress = emailAddress;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
