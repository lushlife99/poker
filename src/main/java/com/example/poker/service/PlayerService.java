package com.example.poker.service;


import com.example.poker.dto.ResponseDto;
import com.example.poker.model.Player;
import com.example.poker.model.Board;
import com.example.poker.model.RoleType;
import com.example.poker.model.User;
import com.example.poker.repository.PlayerRepository;
import com.example.poker.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlayerService {

    private final PlayerRepository playerRepository;
    private final BoardRepository boardRepository;

    @Autowired
    private BoardService boardService;

    @Transactional
    public Board 게임입장(int id) {
        Player player = playerRepository.findById(id).get();
        if(player.getBoard() != null){
            return player.getBoard();
        }

        List<Board> boards = boardRepository.findAll();
        Board board;
        if(boards.size() == 0){
            board = boardService.테이블추가();
        }
        else{
            board = boards.get(0);
            for (int i = 0; i < boards.size(); i++) {
                board = boards.get(i);
                if (board.getTotal_player() < 6)
                    break;
            }
            if (board.getTotal_player() == 6) {
                board = boardService.테이블추가();
            }
        }
        board.setTotal_player(board.getTotal_player()+1);
        player.setBoard(board);
        playerRepository.save(player);
        return board;
    }

    @Transactional
    public Board 바이인(int id){
        Player player = playerRepository.findById(id).get();
        Board board = player.getBoard();
        player.setStack(300000);
        player.setMoney(player.getMoney()-300000);
        boardRepository.save(board);
        return board;
    }

    public  Player 회원가입(String name){
        Player player = new Player();
        player.setUsername(name);
        player.setPassword("1234");
        playerRepository.save(player);
        return player;
    }

    @Transactional
    public void 타임아웃(int id){
        Player player = playerRepository.findById(id).get();
        player.setFold(1);
    }

    @Transactional
    public Player 게임퇴장(int id){
        Player player = playerRepository.findById(id).get();
        player.getBoard().setTotal_player(player.getBoard().getTotal_player()-1);
        player.setBoard(null);
        playerRepository.save(player);
        return player;
    }

    // playerApiController -> 회원가입
    @Transactional()
    public void save(Player player){
        try {
            playerRepository.save(player);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e + "error발생 ");
        }
    }

    //login
    @Transactional(readOnly = true)
    public Player login(Player player){
        return playerRepository.findByUsernameAndPassword(player.getUsername(), player.getPassword());
    }

}


