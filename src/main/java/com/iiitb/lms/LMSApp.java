package com.iiitb.lms;

import com.iiitb.lms.utils.CheckValidity;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;

@SpringBootApplication
public class LMSApp {

    public static void main(String[] args) {

        ConfigurableApplicationContext context = SpringApplication.run(LMSApp.class, args);
        //Check validity
        CheckValidity semesterEnd = context.getBean(CheckValidity.class);
        semesterEnd.markReservationStatus();

        //Create a new Thread and that thread will call that java code that needs to be executed at 12 AM
    }
}
