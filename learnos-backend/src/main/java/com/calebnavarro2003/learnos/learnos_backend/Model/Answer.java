package com.calebnavarro2003.learnos.learnos_backend.Model;

import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "answers")
public class Answer {
    @Id
    private int answer_id;
    private int questionId;
    private int userId;

    @Lob
    @Column(name = "answer", columnDefinition = "MEDIUMBLOB")
    private byte[] answer;
    private String Letter;

    @OneToMany(fetch = FetchType.LAZY, mappedBy = "answer")
    private List<Answer> answers;

    public List<Answer> getAnswers() {
        return answers;
    }

    public void setAnswers(List<Answer> answers) {
        this.answers = answers;
    }

    public int getAnswer_id() {
        return answer_id;
    }

    public int getUserId() {
        return userId;
    }

    public void setUserId(int userId) {
        this.userId = userId;
    }

    public void setAnswer_id(int answer_id) {
        this.answer_id = answer_id;
    }

    public int getQuestionId() {
        return questionId;
    }

    public void setQuestionId(int questionId) {
        this.questionId = questionId;
    }

    public byte[] getAnswer() {
        return answer;
    }

    public void setAnswer(byte[] answer) {
        this.answer = answer;
    }

    public String getLetter() {
        return Letter;
    }

    public void setLetter(String letter) {
        Letter = letter;
    }

    public List<Integer> getQuestionNumbers() {
        List<Integer> numbers = new ArrayList<>();
        for (Answer answer : answers) {
            numbers.add(answer.getQuestionId());
        }
        return numbers;
    }
}
