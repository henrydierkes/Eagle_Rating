package com.astar.ratingbackend.Config;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.context.annotation.Bean;

@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                .csrf().disable() // Note: Disabling CSRF is not recommended for production
                .authorizeRequests()
                .antMatchers("/auth/sign-up", "/auth/sign-in").permitAll() // Permit all access to sign-up and sign-in
                .anyRequest().authenticated() // All other requests require authentication
                .and()
                .httpBasic(); // Basic HTTP auth for simplicity here
    }

}

