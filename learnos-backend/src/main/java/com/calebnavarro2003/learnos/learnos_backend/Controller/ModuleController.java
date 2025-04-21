package com.calebnavarro2003.learnos.learnos_backend.Controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calebnavarro2003.learnos.learnos_backend.Service.ModuleService;
import com.calebnavarro2003.learnos.learnos_backend.Model.Module;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleUpdateRequest;
import com.calebnavarro2003.learnos.learnos_backend.Model.SummaryResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/module")
public class ModuleController {

    @Autowired
    ModuleService moduleService;

    @GetMapping("/allmodules")
    public List<Module> getAllModules() {
       return moduleService.getAllModules();
    }

    @GetMapping("/{id}")
    public Module getModuleById(@PathVariable Integer id) {
        return moduleService.getModuleById(id);
    }

        @GetMapping("/summary")
    public SummaryResponse getModuleSummary() {
        SummaryResponse response = moduleService.getModuleSummaries();
        return response;
    }

    @PostMapping("/create")
public Module createModule(@RequestBody Module module) {
    return moduleService.saveModule(module);
}

    @PostMapping("/update")
    public Module updateModule(@RequestBody ModuleUpdateRequest moduleUpdateRequest) {
        return moduleService.updateModule(moduleUpdateRequest);
    }
    
}
