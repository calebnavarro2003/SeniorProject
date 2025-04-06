package com.calebnavarro2003.learnos.learnos_backend.Repository;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.calebnavarro2003.learnos.learnos_backend.Model.Grade;

@Repository
public interface GradeRepository extends JpaRepository<Grade, Integer> {
    Grade findByIdAndModuleId(Integer userId, Integer moduleId);
}