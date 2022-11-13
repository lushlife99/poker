package com.example.poker.service;


import com.example.poker.model.Player;
import com.example.poker.model.Board;
import com.example.poker.repository.PlayerRepository;
import com.example.poker.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

        List<Board> boards = boardRepository.findAll();
        Board board = new Board();
        if(boards.size() == 0){
            board = boardService.테이블추가();
        }
        else{
            for (int i = 1; i < boards.size(); i++) {
                board = boards.get(i);
                if (board.getTotal_player() < 6)
                    break;
            }
            if (board.getTotal_player() == 6) {
                board = boardService.테이블추가();
            }
        }
        player.setBoard(board);
        return board;
    }

    @Transactional
    public Board 바이인(Player player){
        Board board = player.getBoard();
        board.setTotal_player(board.getTotal_player()+1);
        player.setStack(300000);
        player.setMoney(player.getMoney()-300000);
        playerRepository.save(player);
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

}


