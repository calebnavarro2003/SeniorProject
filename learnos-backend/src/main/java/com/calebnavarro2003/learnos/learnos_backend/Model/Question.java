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
    private int module;
    private int module_id;

    @Lob
    @Column(name = "Image", columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    public int getQuestion_id() {
        return questionId;
    }

    public void setQuestion_id(int question_id) {
        this.questionId = question_id;
    }

    public int getModule() {
        return module;
    }

    public void setModule(int module) {
        this.module = module;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public void setModuleId(int moduleId) {
        this.module_id = moduleId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }
}
