package com.example.mailserver.Logic;

import com.example.mailserver.Logic.Attachments.FileStorageProperties;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({
	FileStorageProperties.class
})
public class MailserverApplication {

	public static void main(String[] args) {
		SpringApplication.run(MailserverApplication.class, args);
	}

}
