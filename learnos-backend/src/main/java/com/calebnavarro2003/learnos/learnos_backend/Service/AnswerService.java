package com.calebnavarro2003.learnos.learnos_backend.Service;

import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calebnavarro2003.learnos.learnos_backend.Model.Answer;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleStatistic;
import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResult;
import com.calebnavarro2003.learnos.learnos_backend.Repository.AnswerRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.QuestionResultRepository;

@Service
public class AnswerService {
    
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private QuestionResultRepository questionResultRepository;

    public List<QuestionResult> submitAnswers(List<Answer> answers) {
        List<QuestionResult> results = new ArrayList<>();
        for (Answer answer : answers) {
            String realAnswer = answerRepository.findLetterByquestionId(answer.getQuestionId()).getLetter();
            boolean isCorrect = realAnswer.equals(answer.getLetter());

            results.add(new QuestionResult(answer.getQuestionId(), isCorrect, answer.getUserId(), answer.getLetter()));

            QuestionResult questionResult = new QuestionResult(answer.getQuestionId(), isCorrect, answer.getUserId(), answer.getLetter(),answer.getQuestionId());
            questionResultRepository.save(questionResult);
        }
        return results;
    }

    public List<ModuleStatistic> getModuleStatistics(Integer moduleId) {
        return answerRepository.getCorrectPercentageByModule(moduleId);
    }

}