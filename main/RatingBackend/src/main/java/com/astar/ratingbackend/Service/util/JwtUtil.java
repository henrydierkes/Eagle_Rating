package com.astar.ratingbackend.Service.util;

// File path: src/main/java/com/astar/ratingbackend/util/JwtUtil.java
import com.astar.ratingbackend.Entity.User;
import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.Verification;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "your-secret-key"; // Use a secure, randomly generated key

    public String generateToken(User user) {
        // 1000ms * 60s * 60min = 1 hour
        long expirationTime = 1000 * 60 * 60;

        return JWT.create()
                .withSubject(user.getEmail())
                .withExpiresAt(new Date(System.currentTimeMillis() + expirationTime))
                .withIssuer("eaglerating.com")
                .sign(Algorithm.HMAC256(SECRET_KEY));
    }

    public boolean validateToken(String token) {
        try {
            JWTVerifier verifier = JWT.require(Algorithm.HMAC256(SECRET_KEY))
                    .withIssuer("eaglerating.com")
                    .build();
            DecodedJWT jwt = verifier.verify(token);
            return true;
        } catch (Exception e) {
            // Log token validation error or handle it as needed
            return false;
        }
    }

    public String getEmailFromToken(String token) {
        DecodedJWT jwt = JWT.decode(token);
        return jwt.getSubject();
    }
}
