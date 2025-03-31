package com.calebnavarro2003.learnos.learnos_backend.Service;

import com.calebnavarro2003.learnos.learnos_backend.Model.User;
import com.calebnavarro2003.learnos.learnos_backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public User getUserById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public Boolean authenticate(String email, Long id) {
        User user = userRepository.findByEmail(email);
        return user != null && user.getId().equals(id);
    }
}