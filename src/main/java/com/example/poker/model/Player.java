package com.example.poker.model;


import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Entity
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false, length = 20, unique = true)
    private String username;

    @Column(nullable = false, length = 200)
    private String password;

    @ManyToOne(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinColumn(name="boardId")
    private Board board;

    private int card1;

    private int card2;

    private int stack; //테이블 내의 스택.(칩)

    private int cal; // 베팅할 때 페이즈별로 베팅크기저장

    private int total_cal; // 모든 페이즈에서 플레이어가 베팅한 크기.

    @Column
    private int money; // 게임머니. 게임머니>=stack. 처음에 입장할 때 게임머니에서 차감하고 그만큼 스택에 추가됨.

    @JsonProperty("jokBo")
    private int jokBo; //족보의 경우의수 = 9가지.  높은순으로 저장. ex)로열 스트레이트: 9, 하이카드 : 1

    @JsonProperty("isDraw")
    private Boolean isDraw; //비겼는지 여부. 팟 분배할 때 필요

    @JsonProperty("drawWho")
    private int drawWho; //누구랑 비겼는지. Linkedlist임.

    private int fold; // 폴드와 올인 여부 0:게임중. 1:폴드 2: 올인

    @CreationTimestamp
    @JsonProperty("createDate")
    private Timestamp createDate;

    //private String oauth; // -> 구글 카카오
}
