package com.example.poker.service;

import com.example.poker.model.Board;
import com.example.poker.model.Player;
import com.example.poker.repository.PlayerRepository;
import com.example.poker.repository.BoardRepository;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.*;

@SpringBootTest
class BoardServiceTest {

    @MockBean
    BoardService boardService;

    @MockBean
    PlayerService playerService;

    @Autowired
    PlayerRepository playerRepository;

    @Autowired
    BoardRepository boardRepository;




    @Test
    @DisplayName("테이블 세팅 테스트")
    public void test1(){
        Board board = new Board();
        Player player = new Player();
        player.setUsername("user");
        player.setPassword("1234");
        //boardService.바이인(board, player);
        List<Player> players = new ArrayList<>();
        players.add(player);
        board.setPlayer(players);
        boardRepository.save(board);

    }

    @Test
    @DisplayName("테이블 세팅 테스트")
    @Disabled
    public void test2(){
        Player player1 = new Player();
        player1.setUsername("user1");
        player1.setPassword("1234");
        playerRepository.save(player1);
        Player player2 = new Player();
        player2.setUsername("user2");
        player2.setPassword("1234");
        playerRepository.save(player2);

        Mockito.when(boardService.테이블추가()).thenReturn(
                new Board()
        );
        Mockito.when(playerService.게임입장(1)).thenReturn(
                new Board()
        );

        Board board = boardService.테이블추가();
        boardService.테이블세팅(board);
        List<Player> players = new ArrayList<>();
        players.add(player1);
        players.add(player2);
        board.setPlayer(players);
        boardRepository.save(board);

    }

}