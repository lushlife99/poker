package com.example.poker.controller.api;

import com.example.poker.dto.ResponseDto;
import com.example.poker.model.Board;
import com.example.poker.model.Player;
import com.example.poker.service.BoardService;
import com.example.poker.service.GameService;
import com.example.poker.service.PlayerService;
import com.example.poker.service.UpperGameService;
import com.example.poker.session.SessionManager;
import com.mysql.cj.Session;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

@RestController
public class PlayerApiController {


    @Autowired
    private BoardService boardService;

    @Autowired
    private GameService gameService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private UpperGameService upperGameService;

    @Autowired
    private SessionManager sessionManager;

    @PutMapping("/game/joinGame/{id}")
    public ResponseDto<Board> JoinGame(@PathVariable int id){
        playerService.게임입장(id);
        return new ResponseDto<Board>(playerService.바이인(id));
    }

    @PutMapping("/game/exitGame/{id}")
    public ResponseDto<Player> GameExit(@PathVariable int id){
        return new ResponseDto<Player>(playerService.게임퇴장(id));
    }


    // 회원가입
    @PostMapping("/api/player")
    public ResponseDto<Player> save(@RequestBody ResponseDto<Player> player, HttpServletRequest request){
        Player result = playerService.회원가입(player.getData());
        if(result == null){
            return null;
        }
        else{
            return new ResponseDto<>(result);
        }
    }

    @PutMapping("/api/player/login")
    public ResponseDto<Player> login(@RequestBody ResponseDto<Player> player, BindingResult bindingResult, HttpServletResponse response) {
        if(bindingResult.hasErrors()){
            return null;
        }
        System.out.println("결과 : "+player.getData().getUsername());
        Player loginPlayer = playerService.login(player.getData());
        if(loginPlayer == null){
            bindingResult.reject("loginFail", "아이디 또는 비밀번호가 맞지 않습니다.");
        }
        Cookie idCookie = new Cookie("playerId", String.valueOf(loginPlayer.getId()));
        response.addCookie(idCookie);
        sessionManager.createSession(loginPlayer, response);

        return new ResponseDto<>(loginPlayer);
    }

}
