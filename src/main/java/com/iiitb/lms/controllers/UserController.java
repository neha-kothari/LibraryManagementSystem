package com.iiitb.lms.controllers;

import com.iiitb.lms.beans.User;
import com.iiitb.lms.beans.dto.UserDetailsDTO;
import com.iiitb.lms.beans.dto.UserRegistrationDto;
import com.iiitb.lms.config.JwtTokenProvider;
import com.iiitb.lms.repositories.UserRepository;
import com.iiitb.lms.services.LibrarianService;
import com.iiitb.lms.services.UserService;
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

import java.util.Collections;

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
    private UserRepository userRepository;

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

    @GetMapping("/users/getdetails")
    @ResponseBody
    public User getUserDetails(Authentication auth) {

        User user = userRepository.findByEmailAddress(auth.getName());
        user.setPassword("");
        return user;
    }

    @PostMapping("/users/{user_id}/block")
    @ResponseBody
    public ResponseEntity<UserDetailsDTO> blockMember(Authentication auth, @PathVariable int user_id) {

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
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

    @PostMapping("/users/{user_id}/unblock")
    @ResponseBody
    public ResponseEntity<UserDetailsDTO> unblockMember(Authentication auth, @PathVariable int user_id) {

        UserDetailsDTO userDetailsDTO = new UserDetailsDTO();
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

}
