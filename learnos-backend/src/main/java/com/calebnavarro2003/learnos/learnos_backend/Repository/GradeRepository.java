package com.calebnavarro2003.learnos.learnos_backend.Repository;


import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.calebnavarro2003.learnos.learnos_backend.Model.Grade;
import com.calebnavarro2003.learnos.learnos_backend.Model.GradeId;

@Repository
public interface GradeRepository extends JpaRepository<Grade, GradeId> {
    Optional<Grade> findById(GradeId GradeId);
    
    @Query("SELECT g FROM Grade g WHERE g.id.userId = :userId")
    List<Grade> findByUserId(@Param("userId") Integer userId);
    
    void deleteByIdModuleId(int moduleId);
}