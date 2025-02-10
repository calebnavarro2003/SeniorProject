package com.calebnavarro2003.learnos.learnos_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EntityScan("package com.calebnavarro2003.learnos.learnos_backend.Model")
@EnableJpaRepositories(basePackages = "com.calebnavarro2003.learnos.learnos_backend.Repository")
public class LearnosBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(LearnosBackendApplication.class, args);
    }
}