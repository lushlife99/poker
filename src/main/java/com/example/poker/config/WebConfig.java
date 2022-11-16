// 이건 마지막에 해보자 proxy 개발 , CORS Spring 설정 = 근본적인 해결책

//package com.example.poker.config;
//
//import com.example.poker.proxy.WebMvcConfig;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.http.HttpMethod;
//import org.springframework.web.servlet.config.annotation.CorsRegistry;
//
//// 브라우저는 다른 도메인의 출입을 허락해 주지 않는다.
//// CORS  프록시는 근본적인 해결책이 아니다.
//@Configuration
//public class WebConfig extends WebMvcConfig {
//    // cors 정책들을 설정
//    @Override
//    public void addCorsMappings(CorsRegistry registry) {
//        registry
//                .addMapping("/**")// 어떤 경로를 허락  /** 모든 경로
//                .allowedOrigins("http://localhost:3000")// 다른 도메인이라도 허락해주겟다.
//                .allowedMethods(  // http 메소드들 4개
//                        HttpMethod.GET.name(),
//                        HttpMethod.POST.name(),
//                        HttpMethod.PUT.name(),
//                        HttpMethod.DELETE.name()
//                );
//
//    }
//}
////web mvc 설정을 해줄 수 있따.