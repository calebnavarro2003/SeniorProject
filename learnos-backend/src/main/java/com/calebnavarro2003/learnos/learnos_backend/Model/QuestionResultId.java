package com.calebnavarro2003.learnos.learnos_backend.Model;
import java.io.Serializable;

public class QuestionResultId implements Serializable {
    private Integer questionId;
    private Integer userId;

    // Default constructor, equals, and hashCode methods

    public QuestionResultId() {}

    public QuestionResultId(Integer questionId, Integer userId) {
        this.questionId = questionId;
        this.userId = userId;
    }


}
