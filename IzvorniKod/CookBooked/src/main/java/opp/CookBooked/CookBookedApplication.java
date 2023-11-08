package opp.CookBooked;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootApplication
public class CookBookedApplication {

    @Bean
    public PasswordEncoder pswdEncoder(){
        return new BCryptPasswordEncoder();
    }


    public static void main(String[] args) {
		SpringApplication.run(CookBookedApplication.class, args);
	}

}
