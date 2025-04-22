package com.calebnavarro2003.learnos.learnos_backend.Model;

import jakarta.persistence.Lob;

public class QuestionUpdateDTO {
    private int id; // question id
    private Integer moduleId;
    private String content; // question content
    private String type; // "multipleChoice" or "trueFalse"
    private String correctAnswer; // "A/B/C/D" or "True/False"
    @Lob
    private byte[] image;

    // Getters and setters

    public int getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getModuleId() {
        return moduleId;
    }

    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    public String getDescription() {
        return content;
    }

    public void setDescription(String content) {
        this.content = content;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
    
    public String getCorrectAnswer() {
        return correctAnswer;
    }
    
    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}