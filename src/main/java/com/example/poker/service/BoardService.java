package com.example.poker.service;

import com.example.poker.model.Player;
import com.example.poker.model.Board;
import com.example.poker.repository.PlayerRepository;
import com.example.poker.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BoardService {
    private final PlayerRepository playerRepository;
    private final BoardRepository boardRepository;


    @Transactional
    public Board 바이인(Board board, Player player){
        List<Player> players= board.getPlayer();
        players.add(player);
        board.setPlayer(players);
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
        boardRepository.save(board);

    }
    @Transactional
    public void 페이즈테이블세팅(Board board){
        board.setBet(0);

        for(int i = 0; i < board.getTotal_player(); i++){
            board.getPlayer().get(i).setCal(0);
        }

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
        boardRepository.save(board);
        if(cnt!=board.getTotal_player()){
            return true;
        }
        return false;
    }
    @Transactional
    public boolean 액션카운트증가(Board board){
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

}
