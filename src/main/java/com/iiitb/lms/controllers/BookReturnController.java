package com.iiitb.lms.controllers;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
import com.iiitb.lms.beans.dto.BookReturnDetailsDTO;
import com.iiitb.lms.beans.dto.FineTransactionDTO;
import com.iiitb.lms.services.UserService;
import com.iiitb.lms.services.impl.BookLendingServiceImpl;
import com.iiitb.lms.services.impl.BookReturnServiceImpl;
import com.iiitb.lms.services.impl.FineTransactionServiceImpl;
import com.iiitb.lms.utils.LMSConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lms/v1/return")
public class BookReturnController {

    @Autowired
    private UserService userService;

    @Qualifier("bookReturnServiceImpl")
    @Autowired
    private BookReturnServiceImpl bookReturnService;

    @Autowired
    private FineTransactionServiceImpl fineTransactionService;

    @CrossOrigin(origins = "*")
    @PostMapping()
    @ResponseBody
    public ResponseEntity<BookReturnDetailsDTO> returnBook(Authentication auth, @RequestParam("memberId") int memberId,
                                                           @RequestParam("orderId") int orderId, @RequestParam("lost") int lost) {

        User librarian = userService.getUserFromEmailId(auth.getName());

        BookReturnDetailsDTO returnRequest = new BookReturnDetailsDTO();

        if (librarian == null || librarian.getUserType() != 1 || librarian.getAccountStatus() == LMSConstants.ACCOUNT_STATUS_BLOCKED) {
            returnRequest.setError("User is not allowed to perform this action.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(returnRequest);

        }
        returnRequest.setOrderId(orderId);
        returnRequest.setMemberId(memberId);
        if(lost==1) {
            returnRequest.setStatus(String.valueOf(LMSConstants.BOOK_LEND_STATUS_LOST));
        }

        try {
            returnRequest = (BookReturnDetailsDTO) bookReturnService.execute(returnRequest);

        } catch (Exception e) {
            returnRequest.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(returnRequest);
        }

        return ResponseEntity.created(null)
                .contentType(MediaType.APPLICATION_JSON)
                .body(returnRequest);
    }

    @CrossOrigin(origins = "*")
    @PostMapping("/collectfine")
    @ResponseBody
    public ResponseEntity<FineTransactionDTO> collectFine(Authentication auth, @RequestBody FineTransactionDTO fineTransaction) {

        User librarian = userService.getUserFromEmailId(auth.getName());

        if (librarian == null || librarian.getUserType() != LMSConstants.USER_TYPE_LIBRARIAN || librarian.getAccountStatus() == LMSConstants.ACCOUNT_STATUS_BLOCKED) {
            fineTransaction.setError("User is not allowed to perform this action.");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(fineTransaction);

        }

        try {
            fineTransaction = (FineTransactionDTO) fineTransactionService.execute(fineTransaction);

        } catch (Exception e) {
            fineTransaction.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(fineTransaction);
        }

        return ResponseEntity.created(null)
                .contentType(MediaType.APPLICATION_JSON)
                .body(fineTransaction);
    }


}
