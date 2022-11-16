package com.example.poker.service;

import com.example.poker.model.User;
import com.example.poker.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.poker.dto.*;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpSession;

// 자동으로 컴포넌트 스캔을 통해 자동으로 빈에 띄어줌


@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public void save(User user){
        try {
            userRepository.save(user);
        }catch (Exception e){
            e.printStackTrace();
            System.out.println(e + "error발생 씨발 ");
        }
    }

    @Transactional(readOnly = true) //select
    public User login(User user){

        return userRepository.findByUsernameAndPassword(user.getUsername(), user.getPassword());
    }


}
