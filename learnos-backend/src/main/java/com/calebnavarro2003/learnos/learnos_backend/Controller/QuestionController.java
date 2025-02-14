package com.calebnavarro2003.learnos.learnos_backend.Controller;

import org.springframework.http.HttpHeaders;

import org.springframework.http.MediaType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.calebnavarro2003.learnos.learnos_backend.Model.Question;
import com.calebnavarro2003.learnos.learnos_backend.Service.QuestionService;

import jakarta.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.PostMapping;


@RestController
@RequestMapping("/questions")
@CrossOrigin(origins = "http://localhost:3000")
public class QuestionController {
    
    @Autowired
    QuestionService questionService;

    @GetMapping("/{id}")
    public ResponseEntity<byte[]> getFile(@PathVariable Integer id) {
    Question fileEntity = questionService.getQuestionImage(id);

    return ResponseEntity.ok()
        .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"file.pdf\"")
        .contentType(MediaType.APPLICATION_PDF)
        .body(fileEntity.getImage());
}

    @PostMapping("/upload")
    public ResponseEntity<String> uploadFile(
            @RequestParam("module_id") Integer moduleId,
            @RequestPart("file") MultipartFile file,
            HttpServletRequest request) {
        try {
            // Log the Authorization header
            String authHeader = request.getHeader("Authorization");
            System.out.println("Authorization Header: " + authHeader);

            questionService.saveQuestionImage(moduleId, file.getBytes());
            return ResponseEntity.ok("File uploaded successfully");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to upload file: " + e.getMessage());
        }
    }


}
