package com.example.poker.dto;

import com.example.poker.model.Player;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BoardBetRequestDto {


    private int id;
    //db는 테이블의 값이 한개만 들어가야함. 그래서 배열이 안됨ㅋㅋ
    //그래서 CARD 12345로 받음.
    private int card1;
    private int card2;
    private int card3;
    private int card4;
    private int card5;

    private int betPos;

    private List<Player> player;

    private int total_player; //board에 있는 플레이어 수. (max 6)

    private int amountOfPot; //총 pot 비용.

    private int bet; // 베팅할 때 최고로 높은 베팅 액수.

    private int phaseNum = 0; // 현재 페이즈 단계 저장. player의 fold와 관련있음. 2 프리플랍 3 플랍 4 턴 5 리버

}
