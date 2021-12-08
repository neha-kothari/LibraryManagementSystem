package com.iiitb.lms.controllers;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
import com.iiitb.lms.services.UserService;
import com.iiitb.lms.services.impl.BookLendingServiceImpl;
import com.iiitb.lms.utils.LMSConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lms/v1/orders")
public class BookIssueController {

    @Autowired
    private UserService userService;

    @Autowired
    private BookLendingServiceImpl bookLendingService;


    @CrossOrigin(origins = "*")
    @PostMapping()
    @ResponseBody
    public ResponseEntity<BookIssueDetailsDTO> reserveBook(Authentication auth, @RequestParam("memberId") int memberId,
                                                           @RequestParam("bookItemId") int bookItemId) {

        User librarian = userService.getUserFromEmailId(auth.getName());

        BookIssueDetailsDTO issueRequest = new BookIssueDetailsDTO();

        if (librarian == null || librarian.getUserType() != 1 || librarian.getAccountStatus() == LMSConstants.ACCOUNT_STATUS_BLOCKED) {
            issueRequest.setError("User is not allowed to issue books.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(issueRequest);

        }
        issueRequest.setBookItemId(bookItemId);
        issueRequest.setMemberId(memberId);
        issueRequest.setIssuedByUserId(librarian.getUserId());

        try {
            issueRequest = (BookIssueDetailsDTO) bookLendingService.execute(issueRequest);

        } catch (Exception e) {
            issueRequest.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(issueRequest);
        }

        return ResponseEntity.created(null)
                .contentType(MediaType.APPLICATION_JSON)
                .body(issueRequest);
    }
}
