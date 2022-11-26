package com.example.poker.service;


import com.example.poker.model.Board;
import com.example.poker.model.Player;
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
            boardRepository.save(board);
            return board;
        }
        else{
            페이즈종료(board);
            boardRepository.save(board);
            return board;
        }

    }

    @Transactional
    public Board 레이즈액션(Board board){ //레이즈 했을 때 실행
        boardService.액션(board);
        boardService.액션카운트초기화(board);
        boardRepository.save(board);
        return board;
    }


    @Transactional
    public Board 폴드(Board board){
        boardService.액션(board);
        if(boardService.액션카운트증가(board)){
            gameService.다음베팅플레이어(board);
            boardRepository.save(board);
            return board;
        }
        else{
            페이즈종료(board);
            boardRepository.save(board);
            return board;
        }

    }


    @Transactional
    public Board 페이즈종료(Board board){

        boardService.페이즈테이블세팅(board);

        return board;
    }
    @Transactional
    public int[][] 게임끝(Board board){
        int jokBo[][] = gameService.족보계산하기(board);
        System.out.print("결과 : "+gameService.카드번역기(board.getCard1())+" ");
        System.out.print(gameService.카드번역기(board.getCard2())+" ");
        System.out.print(gameService.카드번역기(board.getCard3())+" ");
        System.out.print(gameService.카드번역기(board.getCard4())+" ");
        System.out.println(gameService.카드번역기(board.getCard5())+" ");
        for(int i = 0; i < board.getTotal_player(); i++){
            System.out.println("플레이어"+(i+1)+" 카드 : "+gameService.카드번역기(board.getPlayer().get(i).getCard1())+" "+gameService.카드번역기(board.getPlayer().get(i).getCard2())
            +"족보 : "+jokBo[i][0]);
        }

        int rank[] = gameService.승자고르기(board, jokBo);
        for(int i = 0; i < rank.length; i++){
            System.out.println((i+1)+"위 : " +rank[i]);
        }
        //팟분배만 하면 됨..
        int result2[][] = gameService.팟분배(board, rank);
        for(int i = 0; i < result2.length; i++){
            System.out.println((i+1)+"위 : " +result2[i][0]+" 얻은 스택 : "+result2[i][1]);
        }
        Player player;

        int[][] result = new int [board.getTotal_player()][8];
        int id;
        for(int i = 0; i < board.getTotal_player(); i++){
            id = board.getPlayer().get(result2[i][0]).getId();   //id 가져옴 그게 0번째.
            result[i][0] = id;
            result[i][1] = result2[i][1];
            result[i][2] = jokBo[result2[i][0]][0];
            result[i][3] = jokBo[result2[i][0]][1];
            result[i][4] = jokBo[result2[i][0]][2];
            result[i][5] = jokBo[result2[i][0]][3];
            result[i][6] = jokBo[result2[i][0]][4];
            result[i][7] = jokBo[result2[i][0]][5];
        }
        boardRepository.save(board);
        return result;
    }

    @Transactional
    public Board 게임종료(Board board){
        boardService.테이블세팅(board);
        for(int i = 0; i < board.getTotal_player(); i++){
            if(board.getPlayer().get(i).getFold() != 1){
                board.getPlayer().get(i).setStack(
                        board.getPlayer().get(i).getStack()+
                                board.getAmountOfPot()
                );
                break;
            }
        }
        boardRepository.save(board);
        return board;
    }

}
