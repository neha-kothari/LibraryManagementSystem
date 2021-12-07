package com.iiitb.lms.controllers;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookReservationRequestDTO;
import com.iiitb.lms.services.UserService;
import com.iiitb.lms.services.impl.BookReservationServiceImpl;
import com.iiitb.lms.utils.LMSConstants;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lms/v1")
public class ReservationsController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserService userService;


    @Autowired
    private BookReservationServiceImpl bookReservationService;


    @CrossOrigin(origins = "*")
    @PostMapping("/reservations/{bookId}")
    @ResponseBody
    public ResponseEntity<BookReservationRequestDTO> reserveBook(Authentication auth, @PathVariable int bookId) {

        User user = userService.getUserFromEmailId(auth.getName());
        BookReservationRequestDTO resReq = new BookReservationRequestDTO();
        if (user == null || user.getUserType() != 2 || user.getAccountStatus() == LMSConstants.ACCOUNT_STATUS_BLOCKED) {
            resReq.setError("User is not allowed to reserve books");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(resReq);

        }

        resReq.setBookId(bookId);
        resReq.setMemberId(user.getUserId());

        try {

            resReq = (BookReservationRequestDTO) bookReservationService.execute(resReq);

        } catch (Exception e) {
            resReq.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(resReq);
        }

        return ResponseEntity.created(null)
                .contentType(MediaType.APPLICATION_JSON)
                .body(resReq);
    }


    @CrossOrigin(origins = "*")
    @DeleteMapping("/reservations/{reservationID}")
    @ResponseBody
    public ResponseEntity<String> deleteReservation(Authentication auth, @PathVariable int reservationID) {

        User user = userService.getUserFromEmailId(auth.getName());

        if (user == null || user.getUserType() != 2 || user.getAccountStatus() == LMSConstants.ACCOUNT_STATUS_BLOCKED) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User is not allowed to delete reservations");

        }

        try {
            bookReservationService.deleteRequest(user, reservationID);

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED).body("Successfully deleted reservation.");
    }
}
