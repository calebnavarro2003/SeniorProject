package com.calebnavarro2003.learnos.learnos_backend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.calebnavarro2003.learnos.learnos_backend.Repository.ModuleRepository;
import com.calebnavarro2003.learnos.learnos_backend.Model.Module;

@Service
public class ModuleService {

    @Autowired
    ModuleRepository moduleRepository;

    
    public List<Module> getAllModules(){
        return moduleRepository.findAll();
    }
}
