package com.calebnavarro2003.learnos.learnos_backend.Model;

import java.math.BigDecimal;

public class ModuleSummary {
    private int moduleId;
    private String title;
    private BigDecimal completionRate;

    public ModuleSummary(int moduleId, String title, BigDecimal completionRate) {
        this.moduleId = moduleId;
        this.title = title;
        this.completionRate = completionRate;
    }

    public int getModuleId() {
        return moduleId;
    }

    public void setModuleId(int moduleId) {
        this.moduleId = moduleId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public BigDecimal getCompletionRate() {
        return completionRate;
    }

    public void setCompletionRate(BigDecimal completionRate) {
        this.completionRate = completionRate;
    }
}
