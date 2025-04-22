package com.calebnavarro2003.learnos.learnos_backend.Service;

import java.math.BigDecimal;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.calebnavarro2003.learnos.learnos_backend.Model.Answer;
import com.calebnavarro2003.learnos.learnos_backend.Model.Module;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleSummary;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleUpdateRequest;
import com.calebnavarro2003.learnos.learnos_backend.Model.Question;
import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionUpdateDTO;
import com.calebnavarro2003.learnos.learnos_backend.Model.SummaryResponse;
import com.calebnavarro2003.learnos.learnos_backend.Repository.AnswerRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.GradeRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.ModuleRepository;
import com.calebnavarro2003.learnos.learnos_backend.Repository.QuestionRepository;

@Service
public class ModuleService {

    @Autowired private ModuleRepository moduleRepository;
    @Autowired private QuestionRepository questionRepository;
    @Autowired private AnswerRepository answerRepository;

    @Autowired private GradeRepository gradeRepository;
    @Autowired private JdbcTemplate jdbcTemplate;

    public List<Module> getAllModules() {
        return moduleRepository.findAll();
    }

    public Module getModuleById(int id) {
        return moduleRepository.findById(id);
    }

    public SummaryResponse getModuleSummaries() {
        List<ModuleSummary> sums = moduleRepository.findModuleSummariesNative();
        BigDecimal overall = answerRepository.getOverallAccuracy();
        return new SummaryResponse(overall, sums);
    }

    public Module saveModule(Module module) {
        return moduleRepository.save(module);
    }

    @Transactional
    public Module updateModule(ModuleUpdateRequest req) {
        // 0) Wipe out every Grade for this module so users will be re-graded later
        gradeRepository.deleteByIdModuleId(req.getId());
        // 1) Update module
        Module module = moduleRepository.findById(req.getId());
        if (module == null) throw new RuntimeException("No module " + req.getId());
        module.setTitle(req.getTitle());
        module.setDescription(req.getDescription());
        moduleRepository.save(module);

        // 2) Upsert questions & answers
        Set<Integer> seen = new HashSet<>();
        if (req.getQuestions() != null) {
            for (QuestionUpdateDTO qdto : req.getQuestions()) {
                // a) find or new question
                Question q = null;
                if (qdto.getId() > 0) {
                    Optional<Question> oq = questionRepository.findById(qdto.getId());
                    if (oq.isPresent() && oq.get().getModuleId() == module.getModuleId()) {
                        q = oq.get();
                    }
                }
                if (q == null) {
                    q = new Question();
                    q.setModuleId(module.getModuleId());
                }
                q.setContent(qdto.getDescription());
                q.setImage(qdto.getImage());
                q = questionRepository.saveAndFlush(q);         // insert/update now
                int qId = q.getQuestionId();
                seen.add(qId);

                // b) update existing answer?
                if (answerRepository.existsById(qId)) {
                    Answer a = answerRepository.findById(qId).get();
                    a.setLetter(qdto.getCorrectAnswer());
                    a.setUserId(0);
                    answerRepository.saveAndFlush(a);
                } else {
                    // new answer: use JDBC so we force answer_id = question_id
                    jdbcTemplate.update(
                      "INSERT INTO answers(answer_id,question_id,user_id,answer,letter) VALUES(?,?,?,?,?)",
                      qId, qId, 0, null, qdto.getCorrectAnswer()
                    );
                }
            }
        }

        // 3) Remove orphans
        List<Question> all = questionRepository.findAll()
          .stream()
          .filter(x->x.getModuleId()==module.getModuleId())
          .collect(Collectors.toList());
        for (Question q: all) {
            if (!seen.contains(q.getQuestionId())) {
                questionRepository.delete(q);
            }
        }

        return module;
    }
}
