package com.example.poker.controller.api;

import com.example.poker.dto.ResponseDto;
import com.example.poker.model.Board;
import com.example.poker.model.Player;
import com.example.poker.service.BoardService;
import com.example.poker.service.GameService;
import com.example.poker.service.PlayerService;
import com.example.poker.service.UpperGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("/player/join/{name}")
    public ResponseDto<Player> SignUp(@PathVariable String name){
      return new ResponseDto<Player>(HttpStatus.OK.value(),  playerService.회원가입(name));
    }

    @PutMapping("/game/joinGame/{id}")
    public ResponseDto<Board> JoinGame(@PathVariable int id){
        return new ResponseDto<Board>(HttpStatus.OK.value(), playerService.게임입장(id));
    }

    @PutMapping("/game/buyin")
    public ResponseDto<Board> BuyIn(@RequestBody Player player){
        return new ResponseDto<Board>(HttpStatus.OK.value(), playerService.바이인(player));
    }
}
