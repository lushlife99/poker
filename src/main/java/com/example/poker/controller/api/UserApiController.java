package com.example.poker.controller.api;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.poker.dto.*;
import com.example.poker.model.*;
import com.example.poker.service.UserService;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;

@Service
@RestController
public class UserApiController {
    @Autowired
    private UserService userService;


    @PostMapping("/api/user")
    public ResponseDto<Integer> save(@RequestBody User user){
        System.out.println("UserApiController : User save 호출됨");
        // 실제로 DB에 insert를 하고 아래에서 리턴해라아아아아.
        user.setRole(RoleType.User); // 관리자는 필요 없는걸로
        userService.save(user);
        return new ResponseDto<Integer>(1);
        //여기서 Jackson 이라는 라이브러리가 객체를 리턴할 때 json 으로 바꿔서 전달해준다.
    }

    @PostMapping("/api/user/login")
    public ResponseDto<Integer> login(@RequestBody User user, HttpSession session){
        System.out.println("UserApiController :  호출됨");
        User principal = userService.login(user);  // 접근주체 principal

        if(principal != null){
            session.setAttribute("principal", principal);
        }

        return  new ResponseDto<Integer>(1);

    }
}
