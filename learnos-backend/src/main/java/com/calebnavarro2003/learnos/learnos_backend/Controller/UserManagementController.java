package com.calebnavarro2003.learnos.learnos_backend.Controller;

import com.calebnavarro2003.learnos.learnos_backend.DataTransferObjects.ReqRes;
import com.calebnavarro2003.learnos.learnos_backend.Model.User;
import com.calebnavarro2003.learnos.learnos_backend.Service.UserManagementService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
public class UserManagementController {

    @Autowired
    private UserManagementService usersManagementService;

    // Refresh Token
    @PostMapping("/auth/refresh")
    public ResponseEntity<ReqRes> refreshToken(@RequestBody ReqRes req){
        return ResponseEntity.ok(usersManagementService.refreshToken(req));
    }
}
