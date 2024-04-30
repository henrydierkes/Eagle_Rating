package com.astar.ratingbackend.Service.Impl;

import com.astar.ratingbackend.Entity.User;
import com.astar.ratingbackend.Model.UserRepository;
import com.astar.ratingbackend.Service.IAuthService;
import com.astar.ratingbackend.Service.IUserService;
import com.astar.ratingbackend.Service.util.JwtUtil;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.NoSuchElementException;
import java.util.Random;

@Service
public class AuthServiceImpl implements IAuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private IUserService userService;
    private final JwtUtil jwtUtil;
    @Autowired
    private JavaMailSender mailSender;
    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    public AuthServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder, JwtUtil jwtUtil) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public User signUp(User user) {
        User existingUser = userRepository.findByEmail(user.getEmail());
        if (existingUser != null) {
            if(!existingUser.isVerified()){
                userService.deleteUserT(existingUser.getUserId());
            }else{
                throw new IllegalArgumentException("User with email " + user.getEmail() + " already exists.");
            }

        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        String authCode = generateAuthCode();
        user.setAuthCode(authCode);
        user.setVerified(false); // User needs to verify email to be marked as verified
        // Save the user
        User savedUser = userRepository.save(user);

        // Send a verification email
        sendVerificationEmail(user.getEmail(), authCode);

        return savedUser;
    }
    private String generateAuthCode() {
        Random random = new Random();
        StringBuilder sb = new StringBuilder(6);
        for (int i = 0; i < 3; i++) { // Loop 3 times for three pairs
            char letter = (char) ('A' + random.nextInt(26)); // Generate random uppercase letter
            int number = random.nextInt(10); // Generate random digit
            sb.append(letter).append(number);
        }
        return sb.toString();
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
    public String signIn(String email, String password) {
        User user = userRepository.findByEmail(email);
        if (user != null && user.isVerified() && passwordEncoder.matches(password, user.getPassword())) {
            // Only generate token if the user is verified
            System.out.println(jwtUtil.generateToken(user));
            return jwtUtil.generateToken(user);
        } else {
            // It could be useful to distinguish the type of authentication error
            if (user != null && !user.isVerified()) {
                throw new BadCredentialsException("User is not verified.");
            } else {
                throw new BadCredentialsException("Invalid email or password supplied");
            }
        }
    }
    private void sendRandomPasswordEmail(String email, String randomPassword) {
        String subject = "Your New Password";
        String senderName = "Eagle Rating";
        String mailContent = "Dear User, ";
        mailContent += "Your new password is: " + randomPassword + ". ";
        mailContent += "Please change your password as soon as possible.";
        mailContent += " Thank you, " + senderName + ".";

        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom("eaglerating.astar@gmail.com");
        message.setTo(email);
        message.setSubject(subject);
        message.setText(mailContent);

        mailSender.send(message);
    }

    // Helper method to generate a random password
    private String generateRandomPassword(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";
        Random random = new SecureRandom();
        StringBuilder password = new StringBuilder();

        for (int i = 0; i < length; i++) {
            int index = random.nextInt(characters.length());
            password.append(characters.charAt(index));
        }

        return password.toString();
    }
    @Override
    public void resetPassword(String email) {
        try {
            // Retrieve user by email
            User user = userService.getUserByEmail(email);

            // Check if user is found
            if (user == null) {
                throw new NoSuchElementException("User with email " + email + " not found.");
            }
            // Retrieve user's ID
            ObjectId id = user.getUserId();

            // Generate a random temporary password
            String tempPassword = generateRandomPassword(8);

            // Encode the temporary password using the password encoder
            String encodedTempPassword = passwordEncoder.encode(tempPassword);

            // Create a query to find the user by their ID
            Query query = new Query(Criteria.where("_id").is(id));

            // Update the user's password with the encoded temporary password
            Update update = Update.update("password", encodedTempPassword);

            // Execute the update query to reset the password in the database
            mongoTemplate.updateFirst(query, update, User.class);

            // Send the temporary password to the user's email
            sendRandomPasswordEmail(email, tempPassword);
        } catch (NoSuchElementException e) {
            // Handle case where user email is not found
            throw new IllegalArgumentException("User with email " + email + " does not exist.");
        } catch (Exception e) {
            // Handle any other exceptions
            throw new IllegalArgumentException("An error occurred while resetting the password: " + e.getMessage());
        }
    }


}

