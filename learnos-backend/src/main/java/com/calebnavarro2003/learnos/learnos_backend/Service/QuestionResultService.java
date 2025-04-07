package com.calebnavarro2003.learnos.learnos_backend.Service;

import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResult;
import com.calebnavarro2003.learnos.learnos_backend.Repository.QuestionResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionResultService {

    private final QuestionResultRepository questionResultRepository;

    @Autowired
    public QuestionResultService(QuestionResultRepository questionResultRepository) {
        this.questionResultRepository = questionResultRepository;
    }

    public List<QuestionResult> getResponsesForUserAndModule(int userId, int moduleId) {
        return questionResultRepository.findByUserIdAndModuleId(userId, moduleId);
    }

    // Other service methods can be added here as needed
}