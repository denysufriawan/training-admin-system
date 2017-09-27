package com.example.tas.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import com.example.tas.model.AuditorAwareImpl;

@Configuration
@EnableJpaAuditing(auditorAwareRef="auditorProvider")
public class PersistenceConfig {
     
    @Bean
    AuditorAwareImpl auditorProvider() {
        return new AuditorAwareImpl();
    }

}