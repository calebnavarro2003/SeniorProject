package com.calebnavarro2003.learnos.learnos_backend.Model;

import java.util.List;

public class ModuleUpdateRequest {
    private int id; // module id to update
    private String title;
    private String description;
    
    private List<QuestionUpdateDTO> questions;

    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<QuestionUpdateDTO> getQuestions() {
        return questions;
    }

    public void setQuestions(List<QuestionUpdateDTO> questions) {
        this.questions = questions;
    }
}
