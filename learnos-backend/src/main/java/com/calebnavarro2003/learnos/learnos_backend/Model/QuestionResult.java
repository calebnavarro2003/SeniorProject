package com.calebnavarro2003.learnos.learnos_backend.Model;


public class QuestionResult {
    private int questionId;
    private boolean isCorrect;

    public QuestionResult(int questionId, boolean isCorrect) {
        this.questionId = questionId;
        this.isCorrect = isCorrect;
    }

    public int getQuestionId() {
        return questionId;
    }

    public boolean isCorrect() {
        return isCorrect;
    }
}
