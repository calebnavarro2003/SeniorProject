package com.calebnavarro2003.learnos.learnos_backend.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calebnavarro2003.learnos.learnos_backend.Model.Answer;
import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResult;
import com.calebnavarro2003.learnos.learnos_backend.Repository.AnswerRepository;

@Service
public class AnswerService {
    
    @Autowired
    private AnswerRepository answerRepository;

    public List<QuestionResult> submitAnswers(List<Answer> answers) {
        List<QuestionResult> results = new ArrayList<>();
        for (Answer answer : answers) {
            String realAnswer = answerRepository.findLetterByquestionId(answer.getQuestionId()).getLetter();
            boolean isCorrect = realAnswer.equals(answer.getLetter());
            results.add(new QuestionResult(answer.getQuestionId(), isCorrect));
        }
        return results;
    }

}