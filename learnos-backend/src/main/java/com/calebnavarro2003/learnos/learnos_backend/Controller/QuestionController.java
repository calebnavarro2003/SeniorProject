package com.calebnavarro2003.learnos.learnos_backend.Controller;

import org.springframework.http.HttpHeaders;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.calebnavarro2003.learnos.learnos_backend.Model.Question;
import com.calebnavarro2003.learnos.learnos_backend.Service.QuestionService;


@RestController
@RequestMapping("/questions")
public class QuestionController {
    
    @Autowired
    QuestionService questionService;

    
    public Question getQuestionImage(@PathVariable Integer id) {
        return questionService.getQuestionImage(id);
    }


    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Integer id) {
    Question fileEntity = questionService.getQuestionImage(id);

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"file.pdf\"")
        .contentType(MediaType.APPLICATION_PDF)
        .body(fileEntity.getImage());
}
}
