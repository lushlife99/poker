package com.example.poker.repository;

import com.example.poker.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


//자동 bean 필요한곳에 인젝션 가능
public interface UserRepository extends JpaRepository<User, Integer> {
    // jpa 레포지터리 는 유저테이블을 관리
    // save 함수 제공해주는 듯
    User findByUsernameAndPassword(String username, String password);
    //select * FROM user WHERE username=? AND password = password
}