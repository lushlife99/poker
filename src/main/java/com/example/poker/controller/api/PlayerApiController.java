package com.example.poker.controller.api;

import com.example.poker.dto.ResponseDto;
import com.example.poker.model.Board;
import com.example.poker.model.Player;
import com.example.poker.model.RoleType;
import com.example.poker.model.User;
import com.example.poker.service.BoardService;
import com.example.poker.service.GameService;
import com.example.poker.service.PlayerService;
import com.example.poker.service.UpperGameService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;

@RestController
@CrossOrigin
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
    @CrossOrigin
    public ResponseDto<Player> SignUp(@PathVariable String name){
        return new ResponseDto<Player>(playerService.회원가입(name));
    }


    @PutMapping("/game/joinGame/{id}")
    @CrossOrigin
    public ResponseDto<Board> JoinGame(@PathVariable int id){
        playerService.게임입장(id);
        return new ResponseDto<Board>(playerService.바이인(id));
    }

    @PutMapping("/game/exitGame/{id}")
    @CrossOrigin
    public ResponseDto<Player> GameExit(@PathVariable int id){
        return new ResponseDto<Player>(playerService.게임퇴장(id));
    }


    // 회원가입
    @PostMapping("/api/player")
    public ResponseDto<Integer> save(@RequestBody Player player){
        System.out.println("PlayerApiController : User save 호출됨");

        player.setMoney(1000000);
        playerService.save(player);
        return new ResponseDto<Integer>(1);
        //여기서 Jackson 이라는 라이브러리가 객체를 리턴할 때 json 으로 바꿔서 전달해준다.
    }

    @PostMapping("/api/player/login")
    public ResponseDto<Integer> login(@RequestBody Player player, HttpSession session){
        Player principal = playerService.login(player);  // 접근주체 principal
        if(principal != null){
            session.setAttribute("principal", principal);
        }
        return  new ResponseDto<Integer>(1);
    }


}
