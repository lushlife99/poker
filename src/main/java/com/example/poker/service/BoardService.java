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
public class BoardService {
    private final PlayerRepository playerRepository;
    private final BoardRepository boardRepository;

    @Autowired
    private GameService gameService;

    @Transactional
    public Board 바이인(Player player){
        Board board = player.getBoard();
        board.setTotal_player(board.getTotal_player()+1);
        boardRepository.save(board);
        return board;
    }

    @Transactional
    public Board 테이블추가(){
        Board board = new Board();
        return board;
    }

    @Transactional
    public void 테이블세팅(Board board){
        board.setBb(board.getBb()+1%board.getTotal_player());
        board.setSb(board.getSb()+1%board.getTotal_player());
        board.setBet(0);
        for(int i = 0; i < board.getTotal_player(); i++){
            board.getPlayer().get(i).setFold(0);
            board.getPlayer().get(i).setCal(0);
            board.getPlayer().get(i).setCard1(0);
            board.getPlayer().get(i).setCard2(0);
            board.getPlayer().get(i).setDrawWho(0);
            board.getPlayer().get(i).setJokBo(0);
            board.getPlayer().get(i).setTotal_cal(0);
            board.getPlayer().get(i).setIsDraw(false);
        }
        board.setBtn(board.getBtn()%board.getTotal_player());
        board.setBetPos(board.getBtn());
        board.setBet(0);
        board.setAmountOfPot(0);
        board.setBb(board.getBb()%board.getTotal_player());
        board.setBetAsk(0);
        board.setPhaseNum(1);
        board.setSb(board.getSb()%board.getTotal_player());
        boardRepository.save(board);

    }
    @Transactional
    public Board 페이즈테이블세팅(Board board){
        board.setBet(0);
        board.setPhaseNum(board.getPhaseNum()+1);
        int betAsk = 0;
        int betPos = board.getBtn();
        boolean signal = false;

        for(int i = 0; i < board.getTotal_player(); i++){

            board.getPlayer().get(i).setTotal_cal(board.getPlayer().get(i).getTotal_cal()+
                    board.getPlayer().get(i).getCal());
            board.getPlayer().get(i).setCal(0);
            if(board.getPlayer().get(i).getFold() != 0){
                betAsk++;

            }
        }
        for(int i = betPos; i < betPos+6; i++){
            if(board.getPlayer().get(betPos%board.getTotal_player()).getFold() == 0){
                break;
            }
            else{
                betPos++;
            }
        }
        board.setBetPos(betPos);
        board.setBetAsk(betAsk);
        boardRepository.save(board);
        return board;
    }

    @Transactional
    public boolean 액션카운트초기화(Board board){ //raise를 받았을 때.-> 다시 세줌
        int cnt = 1;
        for(int i = 0; i < board.getTotal_player(); i++){
            if(board.getPlayer().get(i).getFold() == 1){
                cnt++;
            }
            else if(board.getPlayer().get(i).getFold() == 2){
                cnt++;
            }
        }
        board.setBetAsk(cnt);

        cnt = 0;
        while(true){
            if(board.getPlayer().get((board.getBetPos()+(++cnt))%board.getTotal_player()).getFold() == 0){
                break;
            }
        }
        board.setBetPos(board.getBetPos()+cnt);
        boardRepository.save(board);
        if(cnt!=board.getTotal_player()){
            return true;
        }
        return false;
    }
    @Transactional
    public boolean 액션카운트증가(Board board){
        int cnt = 0;
        while(true){
            if(board.getPlayer().get((board.getBetPos()+(++cnt))%board.getTotal_player()).getFold() == 0){
                break;
            }
        }
        board.setBetAsk(board.getBetAsk()+1);

        if(board.getBetAsk() != board.getTotal_player()){
            return true;
        }
        return false;
    }

    @Transactional
    public Board 중간입장(Board board, int playerId){
        Player player = playerRepository.findById(playerId).get();
        player.setFold(1);
        playerRepository.save(player); // 혹시 더티체킹이 안될까봐..
        boardRepository.save(board);
        return board;
    }
    @Transactional
    public Board 액션(Board board){
        boardRepository.save(board);
        return board;
    }
    @Transactional
    public Board 게임시작(Board board){
        테이블세팅(board);
        gameService.카드돌리기(board);
        return board;
    }

}
