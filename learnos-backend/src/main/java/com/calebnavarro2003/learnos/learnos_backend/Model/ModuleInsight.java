package com.calebnavarro2003.learnos.learnos_backend.Model;

import java.math.BigDecimal;
import java.util.List;

//one call for the module insights page which returns the module's overall question accuracy, 
//completion rate, and array of question ids with their individual accuracy scores
public class ModuleInsight {
    BigDecimal overallAccuracy;
    Long completionRate;
    List<ModuleQuestionStats> questionAccuracyList;

    public ModuleInsight(BigDecimal overallAccuracy, Long completionRate, List<ModuleQuestionStats> questionAccuracyList) {
        this.overallAccuracy = overallAccuracy;
        this.completionRate = completionRate;
        this.questionAccuracyList = questionAccuracyList;
    }
    public BigDecimal getOverallAccuracy() {
        return overallAccuracy;
    }
    public void setOverallAccuracy(BigDecimal overallAccuracy) {
        this.overallAccuracy = overallAccuracy;
    }
    public Long getCompletionRate() {
        return completionRate;
    }

    public void setCompletionRate(Long completionRate) {
        this.completionRate = completionRate;
    }
    public List<ModuleQuestionStats> getQuestionAccuracyList() {
        return questionAccuracyList;
    }   
    public void setQuestionAccuracyList(List<ModuleQuestionStats> questionAccuracyList) {
        this.questionAccuracyList = questionAccuracyList;
    }
}
