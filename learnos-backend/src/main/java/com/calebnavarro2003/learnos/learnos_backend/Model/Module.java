package com.calebnavarro2003.learnos.learnos_backend.Model;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "modules")
public class Module {

    @Id
    private int module_Id;
    private String title;
    private String description;

    public int getModuleId() {
        return module_Id;
    }

    public void setModuleId(int module_Id) {
        this.module_Id = module_Id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
