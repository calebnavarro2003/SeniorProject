package com.calebnavarro2003.learnos.learnos_backend.Repository;
import org.springframework.stereotype.Repository;

import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResult;
import org.springframework.data.jpa.repository.JpaRepository;



@Repository
public interface QuestionResultRepository extends JpaRepository<QuestionResult, Integer> {
    
}
