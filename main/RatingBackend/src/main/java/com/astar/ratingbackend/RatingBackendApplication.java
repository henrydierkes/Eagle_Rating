package com.astar.ratingbackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.mongodb.MongoTransactionManager;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.annotation.PropertySources;


@SpringBootApplication
@PropertySources({@PropertySource("classpath:application.yml"), @PropertySource("file:${user.dir}/.env")})
public class RatingBackendApplication {

    public static void main(String[] args) {
//        ApplicationContext context = SpringApplication.run(RatingBackendApplication.class, args);
//        System.out.println(Arrays.toString(context.getBeanDefinitionNames()));
        SpringApplication.run(RatingBackendApplication.class, args);
    }
    @Autowired
    private MongoTemplate mongoTemplate;

    @Bean
    MongoTransactionManager transactionManager() {
        return new MongoTransactionManager(mongoTemplate.getMongoDbFactory());
    }

}
