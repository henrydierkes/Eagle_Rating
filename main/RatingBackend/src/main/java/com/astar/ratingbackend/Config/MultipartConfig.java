package com.astar.ratingbackend.Config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;

@Configuration
public class MultipartConfig {

    @Bean
    public CommonsMultipartResolver multipartResolver() {
        CommonsMultipartResolver resolver = new CommonsMultipartResolver();
        // Set the maximum file size (e.g., 5 MB)
        resolver.setMaxUploadSizePerFile(5 * 1024 * 1024); // 5 MB
        // Set the default encoding to UTF-8
        resolver.setDefaultEncoding("UTF-8");
        // Add other settings as needed
        return resolver;
    }
}
