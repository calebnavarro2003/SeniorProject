package com.calebnavarro2003.learnos.learnos_backend.Model;

import java.math.BigDecimal;

public class ModuleStatistic {
    private Integer questionId;
    private Long totalResponses;
    private BigDecimal correctResponses;
    private BigDecimal correctPercentage;

    public ModuleStatistic(Integer questionId, Long totalResponses, BigDecimal correctResponses, BigDecimal correctPercentage) {
        this.questionId = questionId;
        this.totalResponses = totalResponses;
        this.correctResponses = correctResponses;
        this.correctPercentage = correctPercentage;
    }

    public Integer getQuestionId() {
        return questionId;
    }

    public void setQuestionId(Integer questionId) {
        this.questionId = questionId;
    }

    public Long getTotalResponses() {
        return totalResponses;
    }

    public void setTotalResponses(Long totalResponses) {
        this.totalResponses = totalResponses;
    }

    public BigDecimal getCorrectResponses() {
        return correctResponses;
    }

    public void setCorrectResponses(BigDecimal correctResponses) {
        this.correctResponses = correctResponses;
    }

    public BigDecimal getCorrectPercentage() {
        return correctPercentage;
    }

    public void setCorrectPercentage(BigDecimal correctPercentage) {
        this.correctPercentage = correctPercentage;
    }
}
