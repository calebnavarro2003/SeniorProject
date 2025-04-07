package com.calebnavarro2003.learnos.learnos_backend.Repository;



import java.math.BigDecimal;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.calebnavarro2003.learnos.learnos_backend.Model.Answer;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleStatistic;
@Repository
public interface AnswerRepository extends JpaRepository<Answer, Integer> {

    Answer findLetterByquestionId(int questionId);

    @Query(value = """
        SELECT 
            q.question_id AS questionId,
            COUNT(r.response_id) AS totalResponses,
            SUM(r.is_correct) AS correctResponses,
            (SUM(r.is_correct) * 1.0 / COUNT(r.response_id)) * 100 AS correctPercentage
        FROM questions q
        LEFT JOIN responses r ON q.question_id = r.question_id
        WHERE q.module_id = :moduleId
        GROUP BY q.question_id, q.content
        LIMIT 100
        """, nativeQuery = true)
    List<ModuleStatistic> getCorrectPercentageByModule(@Param("moduleId") Integer moduleId);
    
    @Query(value = "SELECT module_id FROM questions WHERE question_id = :questionId", nativeQuery = true)
    Integer findModuleIdByQuestionId(@Param("questionId") int questionId);

    @Query(value = """
        SELECT (SUM(r.is_correct) * 1.0 / COUNT(r.response_id)) * 100
        FROM responses r
        INNER JOIN questions q ON r.question_id = q.question_id
        WHERE q.module_id = :moduleId AND r.user_id = :userId
        """, nativeQuery = true)
    BigDecimal getUserGradeByModule(@Param("moduleId") Integer moduleId, @Param("userId") Integer userId);

    @Query(value = """
        SELECT a.*
        FROM answers a
        INNER JOIN questions q ON a.question_id = q.question_id
        WHERE q.module_id = :moduleId
        """, nativeQuery = true)
    List<Answer> findAnswersByModuleId(@Param("moduleId") Integer moduleId);
}