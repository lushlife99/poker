package com.example.poker.service;

import com.example.poker.repository.BoardRepository;
import com.example.poker.repository.PlayerRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class GameServiceTest {

    @MockBean
    GameService gameService;

    @Autowired
    private PlayerRepository playerRepository;
    @Autowired
    private BoardRepository boardRepository;
    @Autowired
    private BoardService boardService;
    @Autowired
    private PlayerService playerService;

    @Test
    @DisplayName("카드 돌리기 테스트")
    public void test1(){

    }

}