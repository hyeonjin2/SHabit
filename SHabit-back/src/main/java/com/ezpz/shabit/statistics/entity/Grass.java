package com.ezpz.shabit.statistics.entity;

import com.ezpz.shabit.user.entity.User;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Getter
@Builder
@ToString
@NoArgsConstructor
@AllArgsConstructor
@Table(name="grass")
public class Grass {
    @Id
    @Column(name = "grass_id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long grassId;

    @Column(name = "date", nullable = false)
    private Date date;

    @Column(name = "percentage", nullable = false)
    private int percentage;

    @ManyToOne(optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;
}
