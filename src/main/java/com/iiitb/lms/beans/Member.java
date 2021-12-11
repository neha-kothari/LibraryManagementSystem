package com.iiitb.lms.beans;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
public class Member extends User{
    @Column
    private Date dateOfMembership;
    @Column
    private Date validTillDate;
    @OneToMany
    private List<BookLending> bookLendings;

    public Member(User user){
        super(user);
    }

}
