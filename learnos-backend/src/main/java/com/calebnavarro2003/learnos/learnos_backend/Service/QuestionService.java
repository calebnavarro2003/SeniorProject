package com.calebnavarro2003.learnos.learnos_backend.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calebnavarro2003.learnos.learnos_backend.Model.Question;
import com.calebnavarro2003.learnos.learnos_backend.Repository.QuestionRepository;

@Service
public class QuestionService {
    
    @Autowired
    private QuestionRepository questionRepository;

    public Question getQuestionImage(int id) {
        return questionRepository.findImageByQuestionId(id);
    }

 
}
