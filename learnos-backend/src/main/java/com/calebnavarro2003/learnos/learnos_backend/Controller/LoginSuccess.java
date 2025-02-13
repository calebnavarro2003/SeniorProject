package com.calebnavarro2003.learnos.learnos_backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginSuccess {

    @GetMapping("/dashboard")
    public String loginSuccess() {
        return "Welcome";
    }
}
