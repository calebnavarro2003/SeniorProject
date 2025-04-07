package com.calebnavarro2003.learnos.learnos_backend.Controller;

import com.calebnavarro2003.learnos.learnos_backend.Service.UserService;
import com.calebnavarro2003.learnos.learnos_backend.Model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.HashMap;
import java.util.Map;


@RestController
public class UserController {

    @GetMapping("/get-user-info")
    public Map<String, Object> user(Authentication authentication) {
        User principal = (User) authentication.getPrincipal();
        Map<String, Object> userAttributes = new HashMap<>();
        userAttributes.put("name", principal.getName());
        userAttributes.put("picture", principal.getProfilePicture());
        userAttributes.put("email", principal.getEmail());
        userAttributes.put("id", principal.getId());
        return userAttributes;
    }

    @Autowired
    private UserService userService;

    @GetMapping("/{id}/email")
    public String getUserEmail(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return user.getEmail();
    }

    @GetMapping("/{email:.+}/id")
    public Long getUserId(@PathVariable String email) {
        User user = userService.getUserByEmail(email);
        if (user != null) {
            return user.getId();
        } else {
            // Indicate user not found appropriately
            return null;
        }
    }

    @GetMapping("/authenticate")
    public Boolean authenticate(@RequestParam String email, @RequestParam Long id) {
        return userService.authenticate(email, id);
    }

}