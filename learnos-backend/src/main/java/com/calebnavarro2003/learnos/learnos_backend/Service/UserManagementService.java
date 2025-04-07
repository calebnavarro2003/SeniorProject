package com.calebnavarro2003.learnos.learnos_backend.Service;

import com.calebnavarro2003.learnos.learnos_backend.DataTransferObjects.ReqRes;
import com.calebnavarro2003.learnos.learnos_backend.Model.User;
import com.calebnavarro2003.learnos.learnos_backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.HashMap;
import java.util.List;
import java.util.Optional;

@Service
public class UserManagementService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtils jwtUtils;

    public User processOAuth2User(OAuth2User oAuth2User) {
        String email = oAuth2User.getAttribute("email");
        Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
            // Optionally update user details based on OAuth2 attributes
            user.setName(oAuth2User.getAttribute("name"));
            user.setProfilePicture(oAuth2User.getAttribute("picture"));
            // Save updates if necessary
            userRepository.save(user);
        } else {
            // Create a new user record if this is a first-time login
            user = new User();
            user.setEmail(email);
            user.setName(oAuth2User.getAttribute("name"));
            // Set a default role, e.g., "USER"
            user.setRole("USER");
            user.setProfilePicture(oAuth2User.getAttribute("picture"));
            user = userRepository.save(user);
        }
        return user;
    }

    public ReqRes refreshToken(ReqRes refreshTokenRequest) {
        ReqRes response = new ReqRes();
        try {
            String email = jwtUtils.extractUsername(refreshTokenRequest.getToken());
            Optional<User> userOptional = Optional.ofNullable(userRepository.findByEmail(email));
            User user;
            if (userOptional.isPresent()) {
                user = userOptional.get();
            } else {
                throw new Exception();
            }

            if (jwtUtils.isTokenValid(refreshTokenRequest.getToken(), user)) {
                String newJwt = jwtUtils.generateToken(user);
                response.setStatusCode(200);
                response.setToken(newJwt);
                response.setRefreshToken(refreshTokenRequest.getToken());
                response.setExpirationTime("24Hrs");
                response.setMessage("Successfully refreshed the token");
            }
        } catch (Exception e) {
            response.setStatusCode(500);
            response.setMessage(e.getMessage());
        }
        return response;
    }
}
