package com.calebnavarro2003.learnos.learnos_backend.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.calebnavarro2003.learnos.learnos_backend.Model.Module;

@Repository
public interface ModuleRepository extends JpaRepository<Module, Integer> {
    List<Module> findAll();

    Module findById(int id);
}
