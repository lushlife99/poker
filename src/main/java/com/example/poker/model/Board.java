package com.example.poker.model;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;


import javax.persistence.*;
import java.sql.Timestamp;
import java.util.List;


@Data
@AllArgsConstructor
@Entity
@Builder
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "boardId")
    private int id;

    //db는 테이블의 값이 한개만 들어가야함. 그래서 배열이 안됨ㅋㅋ
    //그래서 CARD 12345로 받음.
    private int card1;
    private int card2;
    private int card3;
    private int card4;
    private int card5;

    @OneToMany(mappedBy = "board", cascade = CascadeType.PERSIST)
    @JsonIgnoreProperties(value = "board", allowSetters = true)
    private List<Player> player;

    @JsonProperty("total_player")
    private int total_player;

    @JsonProperty("amountOfPot")
    private int amountOfPot;

    @JsonProperty("betPos")
    private int betPos;

    @JsonProperty("betAsk")
    private int betAsk;

    @JsonProperty("potIdx")
    private int potIdx;

    private int bet; // 베팅할 때 최고로 높은 베팅 액수.

    @JsonProperty("phaseNum")
    private int phaseNum; // 현재 페이즈 단계 저장. player의 fold와 관련있음. 2 프리플랍 3 플랍 4 턴 5 리버

    private int bb; // 빅블라인드인 플레이어 번호. 매 게임마다 원순열 느낌으로 돌릴꺼임. bb = (bb+1)%total_player

    private int sb; // bb랑 비슷함.

    private int btn; // bb- sb - btn  순서. 가장 마지막에 베팅을 하는 포지션

    @CreationTimestamp
    @JsonProperty("createDate")
    private Timestamp createDate;





}



