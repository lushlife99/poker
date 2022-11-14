package com.example.poker.controller;


import com.example.poker.model.Board;
import com.example.poker.service.BoardService;
import com.example.poker.service.PlayerService;
import com.example.poker.service.UpperGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

import javax.servlet.http.HttpServletRequest;

@Controller
public class BoardController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private PlayerService playerService;
    private UpperGameService upperGameService;

    @GetMapping("")
    public String mainPage(){
        return "Game";
    }

    @PutMapping("/test1")
    public String gameStart(Model model, @PathVariable int id){
        Board board = playerService.게임입장(id);
        model.addAttribute("board", board);
        upperGameService.게임시작(board.getId());
        return "";  //뷰 리턴.
    }
    @PutMapping("베팅하는사람이 베팅 시작할때 페이지 요청하는 url")
    public String BetPosBetStart(Model model, @RequestBody Board board){
        model.addAttribute("board");
        return "";  //베팅뷰 리턴.
    }
    @PutMapping("베팅하는사람이 베팅 끝날때 페이지 요청하는 url")
    public String BetPosBetFinish(Model model, @RequestBody Board board){
        model.addAttribute("board",  upperGameService.액션(board));
        return "";  //기다리는뷰 리턴.
    }
    @PutMapping("기다리는사람에게 베팅상황을 보여주는 페이지를 요청하는 url")
    public String WaitPosBetFinish(Model model, @RequestBody Board board){
        model.addAttribute("board");
        return "";  //베팅한 사람의 베팅상황을 알려주는 뷰 리턴.
    }

}
