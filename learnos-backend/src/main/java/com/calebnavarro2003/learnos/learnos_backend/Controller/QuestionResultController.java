package com.calebnavarro2003.learnos.learnos_backend.Controller;

import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResult;
import com.calebnavarro2003.learnos.learnos_backend.Service.QuestionResultService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/question-results")
public class QuestionResultController {

    private final QuestionResultService questionResultService;

    @Autowired
    public QuestionResultController(QuestionResultService questionResultService) {
        this.questionResultService = questionResultService;
    }

    @GetMapping("/user/{userId}/module/{moduleId}")
    public List<QuestionResult> getQuestionResultsByUserAndModule(@PathVariable int userId, @PathVariable int moduleId) {
        return questionResultService.getResponsesForUserAndModule(userId, moduleId);
    }

    // Other CRUD endpoints can be added here as needed
}