package com.calebnavarro2003.learnos.learnos_backend.Service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calebnavarro2003.learnos.learnos_backend.Model.Answer;
import com.calebnavarro2003.learnos.learnos_backend.Model.Grade;
import com.calebnavarro2003.learnos.learnos_backend.Model.GradeId;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleStatistic;
import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResult;
import com.calebnavarro2003.learnos.learnos_backend.Repository.AnswerRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.GradeRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.QuestionResultRepository;

@Service
public class AnswerService {
    
    @Autowired
    private AnswerRepository answerRepository;
    
    @Autowired
    private QuestionResultRepository questionResultRepository;
    
    @Autowired
    private GradeRepository gradeRepository;

    public List<QuestionResult> submitAnswers(List<Answer> answers) {
        List<QuestionResult> results = new ArrayList<>();
        for (Answer answer : answers) {
            String realAnswer = answerRepository.findLetterByquestionId(answer.getQuestionId()).getLetter();
            boolean isCorrect = realAnswer.equals(answer.getLetter());

            results.add(new QuestionResult(answer.getQuestionId(), isCorrect, answer.getUserId(), answer.getLetter()));

            QuestionResult questionResult = new QuestionResult(answer.getQuestionId(), isCorrect, answer.getUserId(), answer.getLetter(), answer.getQuestionId());
            questionResultRepository.save(questionResult);
        }
        // Get module id using the question id since Answer doesn't contain moduleId.
        if (!answers.isEmpty()) {
            Integer moduleId = answerRepository.findModuleIdByQuestionId(answers.get(0).getQuestionId());
            saveModuleGrade(moduleId, answers.get(0).getUserId());
        }
        return results;
    }

    public List<ModuleStatistic> getModuleStatistics(Integer moduleId) {
        return answerRepository.getCorrectPercentageByModule(moduleId);
    }
    
    private void saveModuleGrade(Integer moduleId, int userId) {
        BigDecimal stats = answerRepository.getUserGradeByModule(moduleId, userId);
        GradeId gradeId = new GradeId(userId, moduleId);
        Grade grade = new Grade(gradeId, stats);
        gradeRepository.save(grade);
    }

    public Grade getUserGrade(int userId, int moduleId) {
        GradeId gradeId = new GradeId(userId, moduleId);
        return gradeRepository.findById(gradeId).orElse(null);
    }

    public List<Grade> getUserGrades(int userId) {
        return gradeRepository.findByUserId(userId);
    }

    public List<Answer> getAnswersByModuleId(Integer moduleId) {
        return answerRepository.findAnswersByModuleId(moduleId);
    }
}