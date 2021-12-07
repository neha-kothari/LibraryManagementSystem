package com.iiitb.lms.controllers;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookDetailsDTO;
import com.iiitb.lms.beans.dto.BookDto;

import com.iiitb.lms.config.JwtTokenProvider;

import com.iiitb.lms.repositories.UserRepository;

import com.iiitb.lms.services.BookService;
import com.iiitb.lms.services.UserService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lms/v1/books")
public class BookController {
    private static Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    @PostMapping
    public ResponseEntity<String> addBook(Authentication auth, @RequestBody BookDto bookDto) throws JSONException {

        User user = userService.getUserFromEmailId(auth.getName());
        JSONObject jsonObject = new JSONObject();
        if(user != null && user.getUserType() != 1) {
            jsonObject.put("data", "User not authorized");
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);

        } else {
            if (verifyAddRequest(bookDto)) {
                bookService.addBook(bookDto);
            } else {
                jsonObject.put("error", "ISBN already exists!");
                return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.BAD_REQUEST);
            }

        }
        return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.CREATED);
    }

    @PutMapping
    public ResponseEntity<BookDetailsDTO> updateBook(Authentication auth, @RequestBody BookDto bookDto) {

        User user = userService.getUserFromEmailId(auth.getName());
        if(user != null && user.getUserType() != 1) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);

        } else {
            BookDetailsDTO bookDetails = bookService.updateBookDetails(bookDto);
            if(bookDetails==null)
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(bookDetails);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping
    public ResponseEntity<List<BookDetailsDTO>> getAllBooks() {

        try {
            List<BookDetailsDTO> books = bookService.getAllBooks();

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(books);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @GetMapping(value = "/{bookId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<BookDetailsDTO> getBookDetails(@PathVariable Integer bookId) {

        try {
            BookDetailsDTO bookDetails = bookService.getBookDetails(bookId);

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(bookDetails);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    @CrossOrigin(origins = "*")
    @DeleteMapping(value = "/{bookId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> removeBook(Authentication auth, @PathVariable Integer bookId) {
        User user = userService.getUserFromEmailId(auth.getName());
        JSONObject jsonObject = new JSONObject();
        if (user.getUserType() != 1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"data\":\"User not authorized\"}");
        } else {
            if (bookService.deleteBook(bookId)){
                return ResponseEntity.status(HttpStatus.OK).body("{\"data\":\"Book deleted Successfully\"}");
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"data\":\"Failed to delete\"}");
            }
        }
    }

    public boolean verifyAddRequest(BookDto bookDto) {

        return !bookService.isbnExists(bookDto.getIsbnNumber());
    }
}
