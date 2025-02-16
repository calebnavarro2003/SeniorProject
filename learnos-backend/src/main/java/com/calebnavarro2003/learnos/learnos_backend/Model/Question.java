package com.calebnavarro2003.learnos.learnos_backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "questions")
public class Question {
    @Id
    private int questionId;
    private int moduleId;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Lob
    @Column(name = "Image", columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    public int getQuestion_id() {
        return questionId;
    }

    public void setQuestion_id(int question_id) {
        this.questionId = question_id;
    }

    public int getModuleId() {
        return moduleId;
    }

    public void setModuleId(int moduleId) {
        this.moduleId = moduleId;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
