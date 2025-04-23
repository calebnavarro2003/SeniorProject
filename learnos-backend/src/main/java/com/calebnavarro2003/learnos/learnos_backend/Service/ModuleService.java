package com.calebnavarro2003.learnos.learnos_backend.Service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calebnavarro2003.learnos.learnos_backend.Repository.AnswerRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.ModuleRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.QuestionRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.UserRepository;
import com.calebnavarro2003.learnos.learnos_backend.Model.Module;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleInsight;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleQuestionStats;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleSummary;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleUpdateRequest;
import com.calebnavarro2003.learnos.learnos_backend.Model.Question;
import com.calebnavarro2003.learnos.learnos_backend.Model.SummaryResponse;
import com.calebnavarro2003.learnos.learnos_backend.Model.Answer;


@Service
public class ModuleService {

    @Autowired
    ModuleRepository moduleRepository;

    @Autowired
    AnswerRepository answerRepository;

    @Autowired
    QuestionRepository questionRepository;

    @Autowired
    UserRepository userRepository;

    
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

    public Module saveModule(Module module) {
        return moduleRepository.save(module);
    }

        public Module updateModule(ModuleUpdateRequest moduleUpdateRequest) {
        // Look up the existing module, throw exception if not found
        Module module = moduleRepository.findById(moduleUpdateRequest.getId());
        if(module == null) {
            throw new RuntimeException("Module not found with id: " + moduleUpdateRequest.getId());
        }
        
        // Update basic fields
        module.setTitle(moduleUpdateRequest.getTitle());
        module.setDescription(moduleUpdateRequest.getDescription());
        
        // Update questions
        // Assume module.getQuestions() retrieves current list and each Question has an id field.
        if(moduleUpdateRequest.getQuestions() != null) {
            moduleUpdateRequest.getQuestions().forEach(qdto -> {
                // If question already exists update; else add new if desired.
                Question question = questionRepository.findById(qdto.getId()).orElse(new Question());
                question.setQuestionId(qdto.getId());
                question.setModuleId(moduleUpdateRequest.getId());
                question.setContent(qdto.getDescription());
                question.setImage(qdto.getImage() ); // Assuming image is a Base64 string
                questionRepository.save(question); // save/update question


                Answer answer = new Answer(qdto.getCorrectAnswer(), qdto.getId(), 0);
                answerRepository.save(answer);
            });
        }
        
        return moduleRepository.save(module);
    }


    public ModuleInsight getModuleInsights(int moduleId) {
        BigDecimal overallAccuracy = answerRepository.getOverallAccuracyByModuleId(moduleId);
        Long distinctUsers = answerRepository.countDistinctUsersByModuleId(moduleId);
        Long totalUsers = userRepository.countByRole("USER");
        List<ModuleQuestionStats> moduleQuestionStats = answerRepository.getPerQuestionAccuracyByModuleId(moduleId);
        for (ModuleQuestionStats stats : moduleQuestionStats) {
            System.err.println("QuestionId: " + stats.getQuestionId() + ", Accuracy: " + stats.getAccuracy());
        }
        ModuleInsight moduleInsight = new ModuleInsight(overallAccuracy, (distinctUsers/totalUsers), moduleQuestionStats);

        return moduleInsight;
}
}