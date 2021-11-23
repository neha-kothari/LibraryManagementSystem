package com.iiitb.lms.services;

import com.iiitb.lms.beans.dto.UserDetailsDTO;

public interface LibrarianService {

    UserDetailsDTO blockMember(int user_id) throws Exception;
    UserDetailsDTO unblockMember(int user_id)  throws Exception;
    void issueBook();
    void returnBook();

}
