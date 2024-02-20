package com.astar.ratingbackend.Entity;

import lombok.Data;
import org.springframework.data.annotation.Id;

@Data
public class User {

    @Id
    private String id;
    private String name;


    @Override
    public String toString() {
        return "Person{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                '}';
    }
}
