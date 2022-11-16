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
@CrossOrigin
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
        return new ResponseDto<Board>(board);
    }

    @PutMapping("/api/board/gameStart/{id}")
    public ResponseDto<Board> gameStart(@PathVariable int id){
        return new ResponseDto<Board>(upperGameService.게임시작(id));
    }

    @PutMapping("/api/board/callBetting")
    public ResponseDto<Board> callBetting(@RequestBody Board board){
        return new ResponseDto<Board>(upperGameService.액션(board));
    }

    @PutMapping("/api/board/raiseBetting")
    public ResponseDto<Board> raiseBetting(@RequestBody Board board){
        return new ResponseDto<Board>(upperGameService.레이즈액션(board));
    }

    @PutMapping("/api/board/foldBetting")
    public ResponseDto<Board> foldBetting(@RequestBody Board board){
        return new ResponseDto<Board>(upperGameService.폴드(board));
    }

    @PutMapping("/api/board/phaseEnd")
    public ResponseDto<Board> phaseEnd(@RequestBody Board board){
        return new ResponseDto<Board>(upperGameService.페이즈종료(board));
    }

    @PutMapping("/api/board/winner")
    public ResponseDto<Board> win(@RequestBody Board board){
        return new ResponseDto<Board>(upperGameService.게임종료(board));
    }

    @PutMapping("/api/board/determineWinner")
    public ResponseDto<Board> determineWinner(@RequestBody Board board){
        return new ResponseDto<Board>(upperGameService.게임끝(board));
    }
    //@PutMapping("/api/board/phaseStart/{id}")

}
