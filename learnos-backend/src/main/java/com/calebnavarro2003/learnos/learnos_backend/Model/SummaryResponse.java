package com.calebnavarro2003.learnos.learnos_backend.Model;

import java.math.BigDecimal;
import java.util.List;

public class SummaryResponse {
    private BigDecimal overallAccuracy;
    private List<ModuleSummary> modules;

    public SummaryResponse(BigDecimal overallAccuracy, List<ModuleSummary> modules) {
        this.overallAccuracy = overallAccuracy;
        this.modules = modules;
    }

    public BigDecimal getOverallAccuracy() {
        return overallAccuracy;
    }

    public void setOverallAccuracy(BigDecimal overallAccuracy) {
        this.overallAccuracy = overallAccuracy;
    }

    public List<ModuleSummary> getModules() {
        return modules;
    }

    public void setModules(List<ModuleSummary> modules) {
        this.modules = modules;
    }
}