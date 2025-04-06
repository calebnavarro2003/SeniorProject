package com.calebnavarro2003.learnos.learnos_backend.Model;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "grades")
public class Grade {
    @Id
    @Column(name = "user_id")
    private Integer id;
    private Integer moduleId;
    private BigDecimal percentage;

    public Grade() {}

    public Grade(Integer moduleId, BigDecimal percentage, int userId) {
        this.moduleId = moduleId;
        this.percentage = percentage;
        this.id = userId;
    }

    // Getters and setters
    public Integer getId() {
        return id;
    }

    public Integer getModuleId() {
        return moduleId;
    }

    public void setModuleId(Integer moduleId) {
        this.moduleId = moduleId;
    }

    public BigDecimal getPercentage() {
        return percentage;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
    }
}