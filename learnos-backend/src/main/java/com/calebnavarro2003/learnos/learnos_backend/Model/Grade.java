package com.calebnavarro2003.learnos.learnos_backend.Model;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "grades")
public class Grade {
    @EmbeddedId
    private GradeId id;

    @Column(name = "percentage")
    private BigDecimal percentage;

    public Grade() {}

    public Grade(GradeId id, BigDecimal percentage) {
        this.id = id;
        this.percentage = percentage;
    }

    // Getters and setters
    public GradeId getId() {
        return id;
    }

    public void setId(GradeId id) {
        this.id = id;
    }

    public BigDecimal getPercentage() {
        return percentage;
    }

    public void setPercentage(BigDecimal percentage) {
        this.percentage = percentage;
    }
}