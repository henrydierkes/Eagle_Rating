package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Model.UserRepository;
import com.astar.ratingbackend.Service.IAuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.astar.ratingbackend.Service.util.JwtUtil;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.mail.javamail.JavaMailSender;
import java.util.UUID;
import javax.mail.internet.MimeMessage;


@Service
public class AuthServiceImpl implements IAuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public User signUp(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null && existingUser.isVerified()) {
            throw new IllegalArgumentException("User with email " + user.getEmail() + " already exists and is verified.");
        }

        if (existingUser != null && !existingUser.isVerified()) {
            // Depending on your policy, you might want to notify the user to verify their account
            // Or you could delete the existing unverified user and allow the new sign up
            // Or possibly resend the verification for the existing user
            throw new IllegalArgumentException("An account with that email already exists but is not verified. Please verify the account.");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String authCode = UUID.randomUUID().toString();
        user.setAuthCode(authCode);
        user.setVerified(false); // User needs to verify email to be marked as verified
        // Save the user
        User savedUser = userRepository.save(user);

        // Send a verification email
        sendVerificationEmail(user.getEmail(), authCode);

        return savedUser;
    }
    private void sendVerificationEmail(String email, String authCode) {
        String subject = "Verify Your Email";
        String senderName = "Eagle Rating";
        String mailContent = "Dear User. ";
        mailContent += "Please use the following code to verify your email address:";
        mailContent += " " + authCode + ". ";
        mailContent += "Thank you, " + senderName + ".";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("eaglerating.astar@gmail.com");
        message.setTo(email);
        message.setSubject(subject);
        message.setText(mailContent);

        mailSender.send(message);
    }
    @Override
    public String signIn(String usernameOrEmail, String password) {
        User user = userRepository.findByEmail(usernameOrEmail);
        if (user == null) {
            // If user is not found by email, try to find by username
            user = userRepository.findByUsername(usernameOrEmail);
        }

        if (user != null && user.isVerified() && passwordEncoder.matches(password, user.getPassword())) {
            // Only generate token if the user is verified
            System.out.println(jwtUtil.generateToken(user));
            return jwtUtil.generateToken(user);
        } else {
            // It could be useful to distinguish the type of authentication error
            if (user != null && !user.isVerified()) {
                throw new BadCredentialsException("User is not verified.");
            } else {
                throw new BadCredentialsException("Invalid username/email or password supplied");
            }
        }
    }
}
