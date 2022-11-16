package com.example.poker.service;


import com.example.poker.model.Board;
import com.example.poker.repository.PlayerRepository;
import com.example.poker.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@RequiredArgsConstructor
public class UpperGameService {
    private final PlayerRepository playerRepository;
    private final BoardRepository boardRepository;

    @Autowired
    private BoardService boardService;
    @Autowired
    private PlayerService playerService;
    @Autowired
    private GameService gameService;


    @Transactional
    public Board 게임시작(int id){
        Board board = boardRepository.findById(id).get();
        if(board.getTotal_player() > 1){
            gameService.카드돌리기(board);
        }
        boardRepository.save(board);
        return board;
    }
    @Transactional
    public Board 액션(Board board){ //콜 받았을 때 실행
        boardService.액션(board);
        if(boardService.액션카운트증가(board)){
            gameService.다음베팅플레이어(board);
            return board;
        }
        else{
            페이즈종료(board);
            return board;
        }
    }

    @Transactional
    public Board 레이즈액션(Board board){ //레이즈 했을 때 실행
        boardService.액션카운트초기화(board);
        boardService.액션(board);
        return board;
    }

    @Transactional
    public Board 폴드(Board board){
        boardService.액션(board);
        if(boardService.액션카운트증가(board)){
            gameService.다음베팅플레이어(board);
            return board;
        }
        else{
            페이즈종료(board);
            return board;
        }
    }

    @Transactional
    public Board 페이즈종료(Board board){
        if(board.getPhaseNum() == 5){
            게임끝(board);
        }
        else{
            boardService.페이즈테이블세팅(board);
        }
        return board;
    }
    @Transactional
    public Board 게임끝(Board board){
        int jokBo[][] = gameService.족보계산하기(board);
        int rank[] = gameService.승자고르기(board, jokBo);
        gameService.팟분배(board, rank);
        boardService.테이블세팅(board);
        boardRepository.save(board);
        return board;
    }

    @Transactional
    public Board 게임종료(Board board){
        for(int i = 0; i < board.getTotal_player(); i++){
            if(board.getPlayer().get(i).getFold() != 1){
                board.getPlayer().get(i).setStack(
                        board.getPlayer().get(i).getStack()+
                                board.getAmountOfPot()
                );
                break;
            }
        }
        boardService.테이블세팅(board);
        boardRepository.save(board);
        return board;
    }




}
