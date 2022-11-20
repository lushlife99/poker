package com.example.poker.controller.api;

import com.example.poker.dto.ResponseDto;
import com.example.poker.model.Board;
import com.example.poker.model.Player;
import com.example.poker.repository.BoardRepository;
import com.example.poker.repository.PlayerRepository;
import com.example.poker.service.GameService;
import com.example.poker.service.BoardService;
import com.example.poker.service.PlayerService;
import com.example.poker.service.UpperGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.request.async.DeferredResult;

import javax.servlet.http.HttpSession;

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

    @Autowired
    private BoardRepository boardRepository;

    @Autowired
    private PlayerRepository playerRepository;
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
    public ResponseDto<Board> callBetting(@RequestBody ResponseDto<Board> board){
        return new ResponseDto<Board>(upperGameService.액션(board.getData()));
    }

    @PutMapping("/api/board/raiseBetting")
    public ResponseDto<Board> raiseBetting(@RequestBody ResponseDto<Board> board){
        return new ResponseDto<Board>(upperGameService.레이즈액션(board.getData()));
    }

    @PutMapping("/api/board/foldBetting")
    public ResponseDto<Board> foldBetting(@RequestBody ResponseDto<Board> board){
        System.out.println("토탈플레이어 : " + board.getData().getTotal_player());
        return new ResponseDto<Board>(upperGameService.폴드(board.getData()));
    }

    @PutMapping("/api/board/phaseEnd")
    public ResponseDto<Board> phaseEnd(@RequestBody ResponseDto<Board> board){
        return new ResponseDto<Board>(upperGameService.페이즈종료(board.getData()));
    }

    @PutMapping("/api/board/winner")
    public ResponseDto<Board> win(@RequestBody ResponseDto<Board> board){
        return new ResponseDto<Board>(upperGameService.게임종료(board.getData()));
    }

    @PutMapping("/api/board/determineWinner")
    public ResponseDto<Board> determineWinner(@RequestBody ResponseDto<Board> board){
        return new ResponseDto<Board>(upperGameService.게임끝(board.getData()));
    }

    @PutMapping("/api/board/{id}")
    public DeferredResult<Board> joinGame(@PathVariable int id, HttpSession session){
        DeferredResult<Board> output = new DeferredResult<>();
        try{
            Thread.sleep(2000); //2초 기다림
            Board board = boardRepository.findById(id).get();
            output.setResult(board);
        } catch (Exception e) {

        }
        return output;
    }

}
