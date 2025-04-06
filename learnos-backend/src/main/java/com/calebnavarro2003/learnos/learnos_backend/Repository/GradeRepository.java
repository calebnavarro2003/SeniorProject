package com.calebnavarro2003.learnos.learnos_backend.Repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.calebnavarro2003.learnos.learnos_backend.Model.Grade;
import com.calebnavarro2003.learnos.learnos_backend.Model.GradeId;

@Repository
public interface GradeRepository extends JpaRepository<Grade, GradeId> {
    Optional<Grade> findById(GradeId GradeId);
}