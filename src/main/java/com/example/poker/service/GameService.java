package com.example.poker.service;

import com.example.poker.model.Player;
import com.example.poker.model.Board;
import com.example.poker.repository.PlayerRepository;
import com.example.poker.repository.BoardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class GameService {

    private final PlayerRepository playerRepository;
    private final BoardRepository boardRepository;

    private BoardService boardService;
    private PlayerService playerService;


    @Transactional
    public void 카드돌리기(Board board) {
        int total_draw = board.getTotal_player() * 2 + 5;
        Random random = new Random();

        int current_draw = 0, cnt = 0, temp;
        int[] drawed_card = new int[total_draw];
        Arrays.fill(drawed_card, -1);

        while (total_draw != current_draw) {
            cnt = 0;
            temp = random.nextInt(52);
            for (int i = 0; i < current_draw; i++) {
                if (drawed_card[i] == temp) {
                    cnt++;
                    break;
                }
            }
            if (cnt == 0) {
                drawed_card[current_draw++] = temp;
            }
        }
        board.setCard1(drawed_card[0]);
        board.setCard2(drawed_card[1]);
        board.setCard3(drawed_card[2]);
        board.setCard4(drawed_card[3]);
        board.setCard5(drawed_card[4]);

        cnt=5;
        for(int i = 0; i < board.getTotal_player(); i++){
            board.getPlayer().get(i).setCard1(drawed_card[cnt++]);
            board.getPlayer().get(i).setCard1(drawed_card[cnt++]);
        }
        board.setPhaseNum(2);
        boardRepository.save(board);
    }

    public int 팟계산(Board board) {
        int pot = 0;
        for(int i = 0; i < board.getTotal_player(); i++) {
            pot += (board.getPlayer().get(i).getCal()+board.getPlayer().get(i).getTotal_cal());
        }

        return pot;
    }

    @Transactional
    public void 베팅(Board board) {
        for(int i = 0; i < board.getTotal_player(); i++){
            playerRepository.save(board.getPlayer().get(i));
        }
    }

    public boolean A검사(int card){
        if(card%13 == 0){
            return true;
        }
        return false;
    }

    public int[] 승자고르기(Board board, int[][] status) {
        for(int i = 0; i<board.getTotal_player(); i++){
            board.getPlayer().get(i).setJokBo(status[i][0]);
        }


        long[] a = new long[board.getTotal_player()];
        long b = 100000000;
        for(int i = 0; i < board.getTotal_player(); i++){
            for(int j = 1; j < 6; j++){
                if(A검사(status[i][j])){
                  a[i] +=  14*b;
                }
                else {
                    a[i] += status[i][j]%13 * b;
                    b /= 100;
                }
            }
            b = 100000000;
        }  //이러면 배열에 다 저장됨.
        long temp;
        int temp2;
        int[] rank = new int[board.getTotal_player()];

        for(int i = 0; i < board.getTotal_player(); i++){
            rank[i] = i;
        }
        for(int i = 0; i < board.getTotal_player()-1; i++){
            for(int j = i+1; j < board.getTotal_player(); j++){
                if(a[i]<a[j]){
                    temp  = a[i];
                    a[i] = a[j];
                    a[j] = temp;
                    temp2 = rank[i];
                    rank[i] = rank[j];
                    rank[j] = temp2;
                }
                else if(a[i] == a[j]){


                    if(A검사(status[i][5]%13))
                        status[i][5] = 13;
                    if(A검사(status[j][5]%13))
                        status[j][5] = 13;

                    if(status[i][5]%14 < status[j][5]%14){
                        temp  = a[i];
                        a[i] = a[j];
                        a[j] = temp;
                        temp2 = rank[i];
                        rank[i] = rank[j];
                        rank[j] = temp2;
                    }
                    else if(status[i][5]%14 == status[j][5]%14){ //같으면 스택작은순
                        board.getPlayer().get(i).setIsDraw(true);
                        board.getPlayer().get(j).setIsDraw(true);
                        if(board.getPlayer().get(i).getStack() > board.getPlayer().get(j).getStack()){
                            temp  = a[i];
                            a[i] = a[j];
                            a[j] = temp;
                            temp2 = rank[i];
                            rank[i] = rank[j];
                            rank[j] = temp2;
                            board.getPlayer().get(j).setDrawWho(i);
                        }
                        board.getPlayer().get(i).setDrawWho(j);
                    }
                }
            }
        }

        return rank;
    }

    public Board 팟분배(Board board, int[] rank){
        int cnt = 0;
        int cost = 0;
        int pot = board.getAmountOfPot();
        Player player;

        while(pot >0){
            player = board.getPlayer().get(rank[cnt]);
            if(!player.getIsDraw()) {
                int idx = 0;
                Player player1;
                for(int i = 0; i < board.getTotal_player()-1; i++){
                    player1 = board.getPlayer().get(i);
                    if(player1 == player){
                        continue;
                    }

                    if(player1.getTotal_cal() <= player.getTotal_cal() && player1.getFold() != 1){
                        cost = player1.getTotal_cal();
                        player.setStack(player.getStack()+cost);
                        pot -= cost;
                        player1.setTotal_cal(0);
                        player1.setFold(1); // 돈이 이제 없으니까 폴드처리해줌
                    }
                    else { // player1이 더 크게 베팅했을 때
                        cost = player.getTotal_cal();
                        player1.setStack(player1.getStack() - cost);
                        player.setStack(player.getStack()+cost);
                        pot -= cost;
                    }
                }
            }
            else { //비긴 사람이 있을 때
                Player player1;
                player1 = player;
                int drawPlayerNum = 0;
                int drawWho = player1.getDrawWho();
                int minCal = 999999999;
                int minIdx = 0;
                while (drawWho != 0) {
                    drawPlayerNum++;
                    player1 = board.getPlayer().get(drawWho - 1);
                    if (player1.getTotal_cal() < minCal) {
                        minCal = player1.getTotal_cal();
                        minIdx = drawWho - 1;
                    }
                    drawWho = player1.getDrawWho();
                }

                int sidePot = 0;
                player = board.getPlayer().get(rank[cnt]);
                for (int i = 0; i < board.getTotal_player(); i++){
                    player1 =board.getPlayer().get(i);
                    if(player1 == player){
                        continue;
                    }

                    if(player1.getTotal_cal()<=player.getTotal_cal()){
                        sidePot+= player1.getTotal_cal();
                        player1.setTotal_cal(0);
                        player1.setFold(1); // 돈이 이제 없으니까 폴드처리해줌
                    }
                    else { // player1이 더 크게 베팅했을 때
                        sidePot+= player.getTotal_cal();
                        player1.setCal(player1.getTotal_cal()-player.getTotal_cal());
                    }
                }

                do{
                    player = board.getPlayer().get(drawWho-1);
                    player.setStack(player.getStack() + sidePot/drawPlayerNum);
                    drawWho = board.getPlayer().get(drawWho-1).getDrawWho();
                }while(drawWho != 0); //비긴사람들한테 나눠줌.

                pot -= sidePot;
            }
            cnt++;
            player.setFold(1);  //돈받았으니까 fold 처리
        }

        boardRepository.save(board);
        return board;
    }

    public int[][] 족보계산하기(Board board){
        int rank[][] = new int[board.getTotal_player()][6];
        for(int i = 0; i < board.getTotal_player(); i++) {
            Arrays.fill(rank[i], -1);
        }

        int[] card = new int[7];
        for(int i = 0; i < board.getTotal_player(); i++) {
            if(board.getPlayer().get(i).getFold() == 1) { //폴드했을때
                continue;
            }


            card[0] = board.getCard1();
            card[1] = board.getCard2();
            card[2] = board.getCard3();
            card[3] = board.getCard4();
            card[4] = board.getCard5();

            card[5] = board.getPlayer().get(i).getCard1();
            card[6] = board.getPlayer().get(i).getCard2();

            //테스트용. 원하는 카드 넣기.
			/*Scanner s = new Scanner(System.in);
			System.out.println("카드입력");
			for(int j = 0 ; j < 7; j++) {
				card[j] = s.nextInt();
			}
			*/


            int max = 0, temp, idx = 0;

            for(int k = 0; k < 7; k++) {
                max = 0; idx = 0;
                for(int j = 0; j < 7-k; j++) {
                    if(card[j] % 13 == 0) {
                        max = card[j];
                        idx = j;
                        break;
                    }
                    else if(card[j]%13>=max%13) {
                        max = card[j];
                        idx = j;
                    }
                }
                temp = card[6-k];
                card[6-k] = max;
                card[idx] = temp;
            }
            int top1 = 0;
            int top2 = 0;
            int top3 = 0;
            int top4 = 0;
            int top5 = 0;
            int cnt1 = 0;
            int max_cnt = 0;
            int index = 0;
            boolean royal_straight_flush = false;
            boolean straight_flush = false;
            boolean flush = false;
            boolean straight = false;
            boolean back_straight = false;
            boolean one_pair = false;
            boolean two_pair = false;
            boolean triple = false;
            boolean four_card = false;
            boolean full_house = false;
            boolean high_card = false;
            boolean fold = false;


            //플러쉬 검사.
            int[][] shape = new int[4][7];
            for(int j = 0; j < 4; j++) {
                Arrays.fill(shape[j], -1);
            }
            for(int j = 0; j < 4; j++) {
                cnt1 = 0;
                for(int k = 6; k >=0; k--) {
                    if(card[k]/13 == j) {
                        shape[j][cnt1++] = card[k];

                    }
                    if(cnt1>=5) {
                        index= j;
                        max_cnt = cnt1;
                    }
                }
            }

            if(max_cnt >= 5) {
                flush = true;

                if((shape[index][0]%13) == 0) {
                    top1 = shape[index][0];
                    for(int j = 6; j > 0; j--) {
                        if(shape[index][j] != -1 || (shape[index][j] == -1 && shape[index][j-1] != -1)) {
                            top2 = shape[index][j-4];
                            top3 = shape[index][j-3];
                            top4 = shape[index][j-2];
                            top5 = shape[index][j-1];
                            break;
                        }
                    }
                }
                else {
                    for(int j = 6; j > 0; j--) {
                        if(shape[index][j] == -1 && shape[index][j-1] != -1) {
                            top1 = shape[index][j-5];
                            top2 = shape[index][j-4];
                            top3 = shape[index][j-3];
                            top4 = shape[index][j-2];
                            top5 = shape[index][j-1];
                        }
                    }
                }

            }
            //스트레이트 검사.
            idx = 0;
            int cnt = 1;
            int straight_array[] = new int [5];
            for(int k = 6; k > 0; k--) {
                if(cnt == 1) {
                    max = card[k];
                    straight_array[cnt-1] = card[k];
                }

                if(card[k]%13 == max) {
                    continue;
                }


                if(card[k]%13 == (card[k-1]%13)+1) {

                    straight_array[(cnt++)-1] = card[k];
                }
                else {
                    cnt = 1;
                }

            }
            //백스트레이트 검사.

            if(cnt == 5) {
                straight = true;
                top1 = max;
                top2 = 0;
            }
            if(cnt == 4 && max%13 == 12 && card[6]%13 == 0) {
                cnt++;
                back_straight = true;
                top1 = card[6];
                top2 = 0;
            }

            cnt = 0;
            idx = 0;
            max_cnt = 1;
            int array[] = new int[13];
            Arrays.fill(array, 0);

            //2. 포카드, 트리플 , 페어. ->중복검사

            for(int j = 0; j < 7; j++) {
                for(int k = 0 ; k < 13; k++) {
                    if(card[j]%13 == k) {
                        array[k]++;
                    }
                    if(max_cnt < array[k]) {
                        max_cnt = array[k];
                    }
                }

            }

            cnt1 = 0;
            if(max_cnt == 4) {
                four_card = true;
            }

            else if(!straight && !flush && max_cnt == 3) {
                for(int j = 0; j < 13; j++) {
                    if(array[j] == 3) {
                        if(cnt1 < 2 && top1 < j) {

                            top1 = j;
                            cnt1++;
                        }
                        if(cnt1 == 2) {
                            full_house = true;
                            if(top1 == 0) {
                                top2 = j;
                            }
                            else if(top1 < j) {
                                top2 = top1;
                                top1 = j;
                            }
                            else {
                                top2 = j;
                            }
                        }

                    }

                    if(array[j] == 2) {
                        full_house = true;
                        if(top2 < j) {
                            top2 = j;
                        }
                    }
                }
                if(!full_house) {
                    triple = true;
                }
            }


            else if(!straight && !flush && max_cnt == 2) {

                for(int j = 0; j < 13; j++) {
                    if(array[j] == 2) {
                        cnt1++;
                        if(cnt1 < 2 && top1 <= j) {
                            top1 = j;
                            one_pair = true;
                        }
                        if(cnt1 >=2) {
                            two_pair = true;
                            one_pair = false;
                            if(top1 == 0) {
                                if(cnt1 ==2) {
                                    if(top2<j) {
                                        j = top2;
                                    }
                                }
                            }
                            else {
                                if(top1 < j) {
                                    top2 = top1;
                                    top1 = j;
                                }
                                else if(top2 < j){
                                    top2 = j;
                                }


                            }

                        }

                    }
                }
            }

            //2.로얄 플러시, 로얄 스트레이트 플러시. max에는 스트레이트의 top이 저장되어있음.
            cnt = 1;
            if(straight) {
                if(flush) {
                    for(int q = 0 ; q <4; q++) {
                        if(straight_array[q]%13 == straight_array[q+1] % 13 + 1) {
                            cnt++;
                        }
                    }

                    if(cnt == 5) {
                        straight_flush = true;
                        top1 = max;
                        if(back_straight) {
                            royal_straight_flush = true;
                            top1 = max;
                        }
                    }
                }
            }
            idx = 0;
            if(board.getPlayer().get(i).getFold() == 1) {
                fold = true;
            }
            if(fold) {

                rank[i][0] = 0;
            }
            else if(royal_straight_flush) {

                rank[i][0] = 10;
                rank[i][1] = top1;
            }
            else if(straight_flush) {

                rank[i][0] = 9;
                rank[i][1] = top1;
                rank[i][2] = top2;
            }
            else if(four_card) {

                rank[i][0] = 8;
                rank[i][1] = top1;
                int j = 6;
                for(; j >= 0; j--) {
                    if(top1%13 == 0) {
                        rank[i][2] = card[6];
                    }
                    else {
                        if(card[0]%13 == 0) {
                            rank[i][2] = card[0];
                        }
                        else {

                            j = 6;
                            for(; j >= 0; j--) {
                                if(top1%13 == 0) {
                                    rank[i][2] = card[6];
                                }
                            }
                        }
                    }
                }
            }
            else if(full_house) {

                rank[i][0] = 7;
                rank[i][1] = top1;
                rank[i][2] = top2;
            }
            else if(flush) {

                rank[i][0] = 6;
                rank[i][1] = top1;
                rank[i][2] = top2;
                rank[i][3] = top3;
                rank[i][4] = top4;
                rank[i][5] = top5;

            }
            else if(straight) {

                rank[i][0] = 5;
                rank[i][1] = top1;
            }
            else if(triple) {

                rank[i][0] = 4;
                rank[i][1] = top1;
                int k = 6;
                if(top1%13 != 0) {
                    if(card[0]%13 == 0) {
                        rank[i][2] = card[0];
                        for(; k >= 0; k--) {
                            if(card[k]%13 != top1%13) {
                                rank[i][3] = card[k];

                            }
                        }
                    }
                    else {
                        for(int j = 2; j < 4; j++) {
                            for(; k >= 0; k--) {
                                if(card[k]%13 != top1%13) {
                                    rank[i][j] = card[k--];
                                    break;
                                }
                            }
                        }
                    }
                }
                else {

                }
            }
            else if(two_pair) {

                rank[i][0] = 3;
                rank[i][1] = top1;
                rank[i][2] = top2;
                if(top1%13 == 0) {
                    for(int k = 6; k >= 0 ; k--) {
                        if(card[k]%13 != top2%13 && card[k]%13 != top1%13) {
                            rank[i][3] = card[k];
                            break;
                        }
                    }
                }
                else {
                    if(card[0]%13 == 0) {
                        rank[i][3] = card[0];
                    }
                    else {
                        for(int k = 6; k >= 0 ; k--) {
                            if(card[k]%13 != top2%13 && card[k]%13 != top1%13) {
                                rank[i][3] = card[k];
                                break;
                            }
                        }
                    }
                }

            }
            else if(one_pair) {
                rank[i][0] = 2;
                rank[i][1] = top1;

                if(top1%13 == 0){// A페어일때

                    idx = 4;
                    for(int j = 2; j <5; j++) {
                        rank[i][j] = card[idx--];
                    }
                }
                else { //A페어가 아닐때
                    int k  = 6;
                    if(card[0]%13 == 0) {
                        rank[i][2] = card[0];

                        for(int j = 3; j <5; j++) {
                            for(; k >= 0; k--) {
                                if(card[k]%13 != top1%13) {
                                    rank[i][j] = card[k--];
                                    break;
                                }
                            }
                        }
                    }
                    else {

                        for(int j = 2; j <5; j++) {
                            for(; k >= 0; k--) {
                                if(card[k]%13 != top1%13) {
                                    rank[i][j] = card[k--];
                                    break;
                                }
                            }
                        }
                    }
                }
            }

            else {//하이카드
                rank[i][0] = 1;
                if(card[0]%13 == 0) {
                    rank[i][1] = card[0];
                    rank[i][2] = card[6];
                    rank[i][3] = card[5];
                    rank[i][4] = card[4];
                    rank[i][5] = card[3];


                }
                else {
                    rank[i][1] = card[6];
                    rank[i][2] = card[5];
                    rank[i][3] = card[4];
                    rank[i][4] = card[3];
                    rank[i][5] = card[2];
                }
            }

        }
        return rank;
    }

   /* @Transactional
    public void 사이드팟만들기(board board){ // 페이즈 끝날때마다.
        Pot pot;
        int bet = board.getBet();
        int array[] = new int[board.getTotal_player()];
        for(int i = 0; i < board.getTotal_player(); i++){
            array[i] = i+1;
        }
        int cnt = 0;
        int temp;
        for(int i = 0; i < board.getTotal_player()-1; i++) {
            if(board.getPlayer().get(i).getCal() != bet){
                if(board.getPlayer().get(i).getFold() == 0) {
                    cnt++;
                }
            }
            for(int j = i+1; j < board.getTotal_player(); j++){
                if(board.getPlayer().get(i).getCal() > board.getPlayer().get(j).getCal()){
                    temp = array[j];
                    array[j] = array[i];
                    array[i] = temp;
                }
            }
        }
        //여기까지 하면 베팅의 금액 오름차순으로 정렬됨.
        //array는 index역할.
        //이제 할 것은 인덱스 하나씩 꺼냄. 어디까지? cnt까지.  cnt는 결국 생성할 사이드팟 갯수.
        //그래서 꺼내서 사이드팟 만들고 다시 반복문 돌려서 베팅금액이 맞는지 확인하고
        // 맞을때까지 반복

        int cnt1 = 0;
        int cnt2 = 0;
        if(cnt == 0){
            Iterator<Pot> it  = board.getPot().iterator();
            pot = it.next();
            for(int i = 0; i < board.getTotal_player(); i++){
                if(board.getPlayer().get(i).getFold() == 0){
                    if(board.getPlayer().get(i).getCal() != 0){
                        pot.setAmount(pot.getAmount()+board.getPlayer().get(i).getCal()); //pot에 추가
                        board.getPlayer().get(i).setCal(board.getPlayer().get(i).getCal()-bet); //그만큼 cal비용 차감
                    }
                }
            }
            boardRepository.save(board);
        }
        else {
            while (cnt != cnt1) { //potbuilder의 파마리터-> id가 들어가야함// .
                pot = new Pot();
                cnt2 = 0;
                for (int i = 0; i < board.getTotal_player(); i++) {
                    if (board.getPlayer().get(array[cnt2]).getFold() == 0) {
                        if (board.getPlayer().get(array[cnt2]).getCal() != 0) {
                            pot.setPlayerNum(array[cnt2++]);
                            break;
                        }
                    }
                }
                bet = board.getPlayer().get(pot.getPlayerNum()).getCal();
                pot.setAmount(bet);
                board.getPlayer().get(pot.getPlayerNum()).setCal(0);
                int pn = (pot.getPlayerNum() + 1) % board.getTotal_player();
                while (pn != pot.getPlayerNum()) {
                    if (board.getPlayer().get(pn).getFold() == 0) {
                        if (board.getPlayer().get(pn).getCal() != 0) {
                            pot.setAmount(pot.getAmount() + board.getPlayer().get(pn).getCal()); //pot에 추가
                            board.getPlayer().get(pn).setCal(board.getPlayer().get(pn).getCal() - bet); //그만큼 cal비용 차감
                        }
                    }
                    pn = pn + 1 % board.getTotal_player();
                }
                cnt1++;
                board.getPot().add(pot);
                boardRepository.save(board);
            }
        }
    }
    */

}


