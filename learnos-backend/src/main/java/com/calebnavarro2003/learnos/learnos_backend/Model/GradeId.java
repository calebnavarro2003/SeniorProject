package com.calebnavarro2003.learnos.learnos_backend.Model;

import java.io.Serializable;
import java.util.Objects;
import jakarta.persistence.Embeddable;

@Embeddable
public class GradeId implements Serializable {

    private Integer userId;
    private Integer moduleId;

    public GradeId() {}

    public GradeId(Integer userId, Integer moduleId) {
        this.userId = userId;
        this.moduleId = moduleId;
    }

    // Getters and setters
    public Integer getUserId() {
        return userId;
    }

    public void setUserId(Integer userId) {
        this.userId = userId;
    }

    public Integer getModuleId() {
        return moduleId;
    }

    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        GradeId gradeId = (GradeId) obj;
        return Objects.equals(userId, gradeId.userId) && Objects.equals(moduleId, gradeId.moduleId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(userId, moduleId);
    }
}