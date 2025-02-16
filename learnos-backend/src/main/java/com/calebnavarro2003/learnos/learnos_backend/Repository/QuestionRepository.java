package com.calebnavarro2003.learnos.learnos_backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.calebnavarro2003.learnos.learnos_backend.Model.Question;

@Repository
public interface QuestionRepository extends JpaRepository<Question, Integer> {
    Question findImageByQuestionId(int id);

    Question save(Question question);

    List<Question> findByModuleId(Integer moduleId);
}
