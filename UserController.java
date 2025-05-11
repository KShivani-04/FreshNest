package Controller;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

import Model.User;
import Service.CustomUserDetailsService;
import Service.EmailService;
import Service.JWTUtility;
import Service.UserService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/user")
@CrossOrigin(origins = "*")  // <-- Ensure CORS is enabled
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtility jwtUtility;

    @Autowired
    private CustomUserDetailsService userDetailsService;
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user, HttpServletRequest request) {
        String result = userService.registerUser(user.getEmail(), user.getPassword());

        if ("Email already exists.".equals(result)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("401: Email already exists.");
        } else {
            String siteURL = request.getRequestURL().toString().replace(request.getServletPath(), "");
            emailService.sendVerificationEmail(userService.getUserByEmail(user.getEmail()), siteURL);
            return ResponseEntity.status(HttpStatus.OK).body("200: Successfully registered. Please check your email to verify your account.");
        }
    }


    @GetMapping("/verify")
    public String verifyUser(@RequestParam String code) {
        if (userService.verifyUser(code)) {
            return "Verification successful. You can now log in.";
        } else {
            return "Verification failed. Invalid code.";
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }

        final String token = jwtUtility.generateToken(user.getEmail());
        return ResponseEntity.ok(Collections.singletonMap("token", token));
    }
}
