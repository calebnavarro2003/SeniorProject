package com.calebnavarro2003.learnos.learnos_backend.Repository;



import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.calebnavarro2003.learnos.learnos_backend.Model.Answer;
import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResult;


@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {
    Answer findLetterByquestionId(int questionId);
    void save(QuestionResult questionResult);
}