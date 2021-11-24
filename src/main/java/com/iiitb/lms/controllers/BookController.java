package com.iiitb.lms.controllers;

import com.iiitb.lms.beans.Book;
import com.iiitb.lms.beans.BookItem;
import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookDto;
import com.iiitb.lms.beans.dto.BookItemDto;
import com.iiitb.lms.config.JwtTokenProvider;
import com.iiitb.lms.repositories.BookRepository;
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
    private BookRepository bookRepository;

    @Autowired
    private BookService bookService;

    @PostMapping(value = "/addbook", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> addBook(Authentication auth, @RequestBody BookDto bookDto) throws JSONException {
        User user = userRepository.findByEmailAddress(auth.getName());
        JSONObject jsonObject = new JSONObject();
        if(user.getUserType()!=1) {
            jsonObject.put("data", "User not authorized");
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);

        }else{
            Book book = bookService.save(bookDto);
            jsonObject.put("bookId", book.getBookId());
        }
        return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
    }

    @GetMapping(value = "/removebook/{bookId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> removeBook(Authentication auth, @PathVariable Integer bookId) {
        User user = userRepository.findByEmailAddress(auth.getName());
        JSONObject jsonObject = new JSONObject();
        if(user.getUserType()!=1) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"data\":\"User not authorized\"}");
        }else{
            if(bookService.delete(bookId)){
                return ResponseEntity.status(HttpStatus.OK).body("{\"data\":\"Book deleted Successfully\"}");
            }else{
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("{\"data\":\"Failed to delete\"}");
            }
        }
    }

    @PostMapping(value = "/addbookitem", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> addBookItem(Authentication auth, @RequestBody BookItemDto bookItemDto) throws JSONException {
        User user = userRepository.findByEmailAddress(auth.getName());
        JSONObject jsonObject = new JSONObject();
        if(user.getUserType()!=1) {
            jsonObject.put("data", "User not authorized");
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }else{
            BookItem bookItem = bookService.addBookItem(bookItemDto);
            if(bookItem==null){
                jsonObject.put("data","Book does not exist");
                return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.BAD_REQUEST);
            }
            jsonObject.put("ItemId", bookItem.getItemId());
        }
        return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
    }

    @GetMapping(value = "/removebookitem/{bookItemId}", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
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
    }

}
