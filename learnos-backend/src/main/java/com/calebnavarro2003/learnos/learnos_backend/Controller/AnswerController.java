package com.calebnavarro2003.learnos.learnos_backend.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calebnavarro2003.learnos.learnos_backend.Model.Answer;
import com.calebnavarro2003.learnos.learnos_backend.Model.Grade;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleStatistic;
import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResult;
import com.calebnavarro2003.learnos.learnos_backend.Service.AnswerService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;


@RestController
@RequestMapping("/answers")
@CrossOrigin(origins = "http://localhost:3000")
public class AnswerController {

    @Autowired
    AnswerService answerService;

    @PostMapping("/grade")
    public List<QuestionResult> submitAnswers(@RequestBody List<Answer> answerRequest) {
        return answerService.submitAnswers(answerRequest);
    }

    @GetMapping("/statistics/{moduleId}")
    public List<ModuleStatistic> getMethodName(@PathVariable int moduleId) {
        return answerService.getModuleStatistics(moduleId);
    }

    @GetMapping("/percentage/{userId}/{moduleId}")
    public Grade getUserGrade(@PathVariable int userId, @PathVariable int moduleId) {
        return answerService.getUserGrade(userId, moduleId);
    }
    
}