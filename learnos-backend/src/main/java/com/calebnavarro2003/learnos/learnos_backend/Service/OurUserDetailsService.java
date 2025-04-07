package com.calebnavarro2003.learnos.learnos_backend.Service;

import com.calebnavarro2003.learnos.learnos_backend.Model.User;
import com.calebnavarro2003.learnos.learnos_backend.Repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class OurUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Optional<UserDetails> optional = Optional.ofNullable(userRepository.findByEmail(username));

        if (optional.isPresent()) {
            return optional.get();
        }
        else {
            throw new UsernameNotFoundException("User not found: " + username);
        }

    }
}
