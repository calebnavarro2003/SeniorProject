package com.calebnavarro2003.learnos.learnos_backend.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "responses")
public class QuestionResult {
    @Id
    private int questionId;
    private boolean isCorrect;
    private int userId;
    private String letter;
    private int selected_answer_id;

    public QuestionResult() {}

    public QuestionResult(int questionId, boolean isCorrect, int userId, String letter) {
        this.questionId = questionId;
        this.isCorrect = isCorrect;
        this.userId = userId;
        this.letter = letter;
    }

    public QuestionResult(int questionId, boolean isCorrect, int userId, String letter, int selected_answer_id) {
        this.questionId = questionId;
        this.isCorrect = isCorrect;
        this.userId = userId;
        this.letter = letter;
        this.selected_answer_id = selected_answer_id;
    }

    public int getQuestionId() {
        return questionId;
    }

    public boolean isCorrect() {
        return isCorrect;
    }

    public int getUserId() {
        return userId;
    }

    public String getLetter() {
        return letter;
    }

    public int getSelectedAnswerId() {
        return selected_answer_id;
    }
}
