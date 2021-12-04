package com.iiitb.lms.controllers;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.config.JwtTokenProvider;
import com.iiitb.lms.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lms/v1/bookitems")
public class BookItemController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;



   /* @DeleteMapping(value = "/{bookItemId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> removeBookItem(Authentication auth, @PathVariable Integer bookItemId) {
        User user = userRepository.findByEmailAddress(auth.getName());
        if(user.getUserType()!=1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"data\":\"User not authorized\"}");
        }else{
            if(bookService.removeBookItem(bookItemId)){
                return ResponseEntity.status(HttpStatus.OK).body("{\"data\":\"Book Item deleted Successfully\"}");
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"data\":\"Failed to delete\"}");
            }
        }
    }*/
}
