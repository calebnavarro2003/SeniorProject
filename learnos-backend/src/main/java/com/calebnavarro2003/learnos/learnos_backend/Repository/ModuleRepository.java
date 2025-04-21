package com.calebnavarro2003.learnos.learnos_backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.calebnavarro2003.learnos.learnos_backend.Model.Module;
import com.calebnavarro2003.learnos.learnos_backend.Model.ModuleSummary;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer> {
    List<Module> findAll();

    Module findById(int id);


    @Query(value =
    "SELECT m.module_Id, m.title,  " +
    "       (COUNT(DISTINCT r.question_id) * 100.0) /  " +
    "       (SELECT COUNT(*) FROM `user`) AS completionRate  " +
    "FROM modules m  " +
    "LEFT JOIN questions q ON m.module_Id = q.module_id  " +
    "LEFT JOIN responses r ON q.question_id = r.question_id  " +
    "GROUP BY m.module_Id, m.title",
    nativeQuery = true
)List<ModuleSummary> findModuleSummariesNative();
}
