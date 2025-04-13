package com.calebnavarro2003.learnos.learnos_backend.Controller;

import com.calebnavarro2003.learnos.learnos_backend.Service.JwtUtils;
import com.calebnavarro2003.learnos.learnos_backend.Service.OurUserDetailsService;
import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private JwtUtils jwtUtils;

    @Autowired
    private OurUserDetailsService ourUserDetailsService;

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(HttpServletRequest request) {
        String jwtToken = null;
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("jwt".equals(cookie.getName())) {
                    jwtToken = cookie.getValue();
                    break;
                }
            }
        }

        Map<String, Object> responseBody = new HashMap<>();
        if (jwtToken == null) {
            responseBody.put("authenticated", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }

        String username = jwtUtils.extractUsername(jwtToken);
        if (username == null) {
            responseBody.put("authenticated", false);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }

        UserDetails userDetails = ourUserDetailsService.loadUserByUsername(username);
        boolean valid = jwtUtils.isTokenValid(jwtToken, userDetails);
        responseBody.put("authenticated", valid);
        if (valid) {
            responseBody.put("username", username);
            // If you have a way to determine admin status, you can include it here.
            // For example, if your UserDetails contains a "role" property:
            responseBody.put("isAdmin", userDetails.getAuthorities().stream()
                    .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ADMIN")));
        }

        return ResponseEntity.ok(responseBody);
    }

    @PostMapping("/logout")
    public ResponseEntity<String> logout(HttpServletResponse response) {
        // Create a new cookie with the same name "jwt"
        Cookie cookie = new Cookie("jwt", null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true); // use true if your app is in production with HTTPS
        cookie.setPath("/");   // Ensure the path matches where the cookie was originally set
        cookie.setMaxAge(0);   // Max age 0 deletes the cookie immediately
        response.addCookie(cookie);

        return ResponseEntity.ok("Logged out successfully");
    }
}
