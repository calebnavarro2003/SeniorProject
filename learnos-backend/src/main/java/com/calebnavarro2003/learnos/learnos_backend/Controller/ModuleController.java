package com.calebnavarro2003.learnos.learnos_backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calebnavarro2003.learnos.learnos_backend.Service.ModuleService;
import com.calebnavarro2003.learnos.learnos_backend.Model.Module;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
@RequestMapping("/module")
public class ModuleController {

    @Autowired
    ModuleService moduleService;

    @GetMapping("/allmodules")
    public List<Module> getAllModules() {
       return moduleService.getAllModules();
    }
    
}
