package com.calebnavarro2003.learnos.learnos_backend.Model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "questions")
public class Question {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "question_id")
    private Integer questionId;

    @Column(name = "module_id", nullable = false)
    private Integer moduleId;

    @Column(columnDefinition = "TEXT")
    private String content;

    @Lob
    @Column(name = "Image", columnDefinition = "MEDIUMBLOB")
    private byte[] image;

    public Question() { }

    // ————— Getters & Setters —————

    public Integer getQuestionId() {
        return questionId;
    }

    // No setter for questionId if you want it fully managed by the DB,
    // or include one if you need it.
    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Integer getModuleId() {
        return moduleId;
    }

    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
