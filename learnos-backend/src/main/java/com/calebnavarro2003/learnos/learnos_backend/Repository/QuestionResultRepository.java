package com.calebnavarro2003.learnos.learnos_backend.Repository;
import org.springframework.stereotype.Repository;

import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResult;
import com.calebnavarro2003.learnos.learnos_backend.Model.QuestionResultId;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;



@Repository
public interface QuestionResultRepository extends JpaRepository<QuestionResult, QuestionResultId> {
    @Query("SELECT qr FROM QuestionResult qr WHERE qr.userId = :userId AND qr.questionId IN (SELECT q.id FROM Question q WHERE q.moduleId = :moduleId)")
    List<QuestionResult> findByUserIdAndModuleId(@Param("userId") int userId, @Param("moduleId") int moduleId);
}
