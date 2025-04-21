package com.calebnavarro2003.learnos.learnos_backend.Service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calebnavarro2003.learnos.learnos_backend.Repository.AnswerRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.ModuleRepository;
import com.calebnavarro2003.learnos.learnos_backend.Model.Module;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleSummary;
import com.calebnavarro2003.learnos.learnos_backend.Model.SummaryResponse;

@Service
public class ModuleService {

    @Autowired
    ModuleRepository moduleRepository;

    @Autowired
    AnswerRepository answerRepository;

    
    public List<Module> getAllModules(){
        return moduleRepository.findAll();
    }

    public Module getModuleById(int id) {
        return moduleRepository.findById(id);
    }

        public SummaryResponse getModuleSummaries() {
        List<ModuleSummary> moduleSummaries = moduleRepository.findModuleSummariesNative();
        BigDecimal overallAccuracy = answerRepository.getOverallAccuracy();
        return new SummaryResponse(overallAccuracy, moduleSummaries);
    }
}
