package com.calebnavarro2003.learnos.learnos_backend.Repository;

import com.calebnavarro2003.learnos.learnos_backend.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    User findEmailById(Long id);
    User findByEmail(String email);
    boolean existsByEmail(String email);
}