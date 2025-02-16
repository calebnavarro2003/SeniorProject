package com.calebnavarro2003.learnos.learnos_backend.Service;

import java.util.List;

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

    public void saveQuestionImage( Integer question_id, Integer moduleId, byte[] image) {
        Question question = new Question();
        question.setQuestionId(question_id);
        question.setModuleId(moduleId);
        question.setImage(image);
        questionRepository.save(question);
    }

    public List<Question> getQuestionsByModuleId(Integer module_Id) {
        return questionRepository.findByModuleId(module_Id);
    }

 
}
