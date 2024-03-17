package com.omnia.scientia;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling

public class ScientiaApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScientiaApplication.class, args);
	}

}
