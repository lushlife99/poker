package com.example.poker.repository;

import com.example.poker.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;


public interface PlayerRepository extends JpaRepository<Player, Integer> {
    Player findByUsernameAndPassword(String username, String password);
}
