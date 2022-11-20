package com.example.poker.controller.api;


import com.example.poker.dto.ResponseDto;
import com.example.poker.model.Board;
import com.example.poker.model.Player;
import com.example.poker.repository.PlayerRepository;
import com.example.poker.service.PlayerService;
import com.example.poker.session.SessionManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
public class TestApiController {

    @Autowired
    private PlayerService playerService;

    @Autowired
    private SessionManager sessionManager;

    @Autowired
    private PlayerRepository playerRepository;




    @PostMapping("/logout") //로그아웃. 세션 만료
    public String logoutV2(HttpServletResponse response, HttpServletRequest request) {
        sessionManager.expire(request);
        return "로그아웃";
    }

    @GetMapping("/")  //세션조회를 통한 컨트롤.
    public String homeLoginV2(HttpServletRequest request, Model model) {
        Player player = (Player) sessionManager.getSession(request);

        if (player == null) {
            return "세션 없음.";
        }

        model.addAttribute("player", player);
        return "세션 있음.";
    }


}
