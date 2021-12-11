package com.iiitb.lms.controllers;

import com.iiitb.lms.beans.Member;
import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.BookIssueDetailsDTO;
import com.iiitb.lms.beans.dto.BookReservationRequestDTO;
import com.iiitb.lms.beans.dto.UserDetailsDTO;
import com.iiitb.lms.beans.dto.UserRegistrationDto;
import com.iiitb.lms.config.JwtTokenProvider;
import com.iiitb.lms.repositories.UserRepository;
import com.iiitb.lms.services.LibrarianService;
import com.iiitb.lms.services.UserService;
import com.iiitb.lms.services.impl.BookReservationServiceImpl;
import com.iiitb.lms.utils.LMSConstants;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.web.bind.annotation.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/lms/v1")
public class UserController {
    private static Logger log = LoggerFactory.getLogger(UserService.class);

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private LibrarianService librarianService;


    @Autowired
    private JwtTokenProvider tokenProvider;

    @Autowired
    private UserService userService;


    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_UTF8_VALUE)
    public ResponseEntity<String> authenticate(@RequestBody User user) {
        log.info("UserResourceImpl : authenticate");
        JSONObject jsonObject = new JSONObject();
        try {
			log.info(user.getEmailAddress() + " : " + user.getPassword());
            Authentication authentication = authenticationManager
                    .authenticate(new UsernamePasswordAuthenticationToken(user.getEmailAddress(), user.getPassword(), Collections.singleton(new SimpleGrantedAuthority("ROLE_USER"))));
            if (authentication.isAuthenticated()) {
                String email = user.getEmailAddress();
                jsonObject.put("name", authentication.getName());
                jsonObject.put("token", tokenProvider.createToken(email));
                return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
            }else{
                jsonObject.put("data","Invalid Credentials");
                return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
            }
        } catch (JSONException e) {
            try {
                jsonObject.put("exception", e.getMessage());
            } catch (JSONException e1) {
                e1.printStackTrace();
            }
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.UNAUTHORIZED);
        }
    }

    /*@ModelAttribute("user")
    public UserRegistrationDto userRegistrationDto() {
        return new UserRegistrationDto();
    }*/
    @CrossOrigin(origins = "*")
    @GetMapping("/users/profile")
    @ResponseBody
    public ResponseEntity<UserDetailsDTO> getUserDetails(Authentication auth) {
        UserDetailsDTO userDetailsDTO = userService.getUserDetails(auth.getName());
        if (null != userDetailsDTO) {
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(userDetailsDTO);
        }
        userDetailsDTO = new UserDetailsDTO();
        userDetailsDTO.setError("Invalid Authentication");
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userDetailsDTO);
    }
    @CrossOrigin(origins = "*")

    @PostMapping("/users/{user_id}/block")
    @ResponseBody
    public ResponseEntity<UserDetailsDTO> blockMember(Authentication auth, @PathVariable int user_id) {

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        if(!isRequestFromLibrarian(auth.getName())){
            userDetailsDTO.setError("User not authorized");
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(userDetailsDTO);
        }
        try {
            userDetailsDTO = librarianService.blockMember(user_id);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(userDetailsDTO);
        } catch (Exception e) {
            e.printStackTrace();
            userDetailsDTO.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userDetailsDTO);
        }

    }

    @CrossOrigin(origins = "*")
    @PostMapping("/users/{user_id}/unblock")
    @ResponseBody
    public ResponseEntity<UserDetailsDTO> unblockMember(Authentication auth, @PathVariable int user_id) {

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
        if(!isRequestFromLibrarian(auth.getName())){
            userDetailsDTO.setError("User not authorized");
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(userDetailsDTO);
        }
        try {
            userDetailsDTO = librarianService.unblockMember(user_id);
            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(userDetailsDTO);
        } catch (Exception e) {
            e.printStackTrace();
            userDetailsDTO.setError(e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(userDetailsDTO);
        }

    }
    @CrossOrigin(origins = "*")
    @GetMapping("/users/students")
    @ResponseBody
    public ResponseEntity<List<UserDetailsDTO>> getStudents(Authentication auth) {
        if(!isRequestFromLibrarian(auth.getName())){
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(null);
        }
        List<UserDetailsDTO> studentsList = librarianService.getStudents();

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(studentsList);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/users/{user_id}/reservations")
    @ResponseBody
    public ResponseEntity<List<BookReservationRequestDTO>> getUserReservations(Authentication auth, @PathVariable int user_id) {
        if(!isRequestFromSameUser(auth.getName(), user_id) && !isRequestFromLibrarian(auth.getName())){
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(null);
        }
        List<BookReservationRequestDTO> reservations = userService.getReservations(user_id);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(reservations);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/users/{user_id}/bookissues/{active}")
    @ResponseBody
    public ResponseEntity<List<BookIssueDetailsDTO>> getUserLendings(Authentication auth, @PathVariable int user_id, @PathVariable int active) {
        if(!isRequestFromSameUser(auth.getName(), user_id) && !isRequestFromLibrarian(auth.getName())){
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(null);
        }
        List<BookIssueDetailsDTO> bookIssues = userService.getIssuedBooks(user_id, active);

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(bookIssues);
    }

    @CrossOrigin(origins = "*")
    @GetMapping("/users/{user_id}/calculatefine")
    @ResponseBody
    public ResponseEntity<String> calculateUserFine(Authentication auth, @PathVariable int user_id) {
        if(!isRequestFromSameUser(auth.getName(), user_id) && !isRequestFromLibrarian(auth.getName())){
            return ResponseEntity.badRequest().contentType(MediaType.APPLICATION_JSON).body(null);
        }
        Member member = userService.getMemberFromUserId(user_id);
        JSONObject jsonObject = new JSONObject();
        try {
            float fine = userService.calculateUserFine(member);
            jsonObject.put("fine", fine);
            return new ResponseEntity<String>(jsonObject.toString(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<String>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }


    private boolean isRequestFromLibrarian(String emailId) {
        User user = userService.getUserFromEmailId(emailId);
        return user.getUserType() == LMSConstants.USER_TYPE_LIBRARIAN;
    }

    private boolean isRequestFromSameUser(String emailId, int userId) {
        User user = userService.getUserFromEmailId(emailId);
        return user.getUserId() == userId;
    }

}
