package com.calebnavarro2003.learnos.learnos_backend.Controller;

import com.calebnavarro2003.learnos.learnos_backend.Service.UserService;
import com.calebnavarro2003.learnos.learnos_backend.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}/email")
    public String getUserEmail(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return user.getEmail();
    }

    @GetMapping("/{email}/id")
    public Long getUserId(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        return user.getId();
    }

    @GetMapping("/authenticate")
    public Boolean authenticate(@RequestParam String email, @RequestParam Long id) {
        return userService.authenticate(email, id);
    }
    
}