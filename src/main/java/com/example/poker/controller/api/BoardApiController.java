package com.example.poker.controller.api;

import com.example.poker.dto.ResponseDto;
import com.example.poker.model.Board;
import com.example.poker.model.Player;
import com.example.poker.service.GameService;
import com.example.poker.service.BoardService;
import com.example.poker.service.PlayerService;
import com.example.poker.service.UpperGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
public class BoardApiController {

    @Autowired
    private BoardService boardService;

    @Autowired
    private GameService gameService;

    @Autowired
    private PlayerService playerService;

    @Autowired
    private UpperGameService upperGameService;

    @PutMapping
    public ResponseDto<Board> gameEnd(@RequestBody Board board){
        upperGameService.게임끝(board);
        return new ResponseDto<Board>(HttpStatus.OK.value(), board);
    }

    @PostMapping("/api/board/{id}")
    public ResponseDto<Board> 게임시작(@PathVariable int id){
        playerService.게임입장(id);
        return new ResponseDto<Board>(HttpStatus.OK.value(), board);
    }


}
