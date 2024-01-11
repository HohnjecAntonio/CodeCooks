package opp.CookBooked.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "pratioci")
public class Pratioci {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    @Setter
    private Long id;

    @ManyToOne
    @JoinColumn(name = "followerID")
    @Getter
    @Setter
    private Korisnik follower;

    @ManyToOne
    @JoinColumn(name = "followingID")
    @Getter
    @Setter
    private Korisnik following;

    public Pratioci(Korisnik follower, Korisnik following) {
        this.follower = follower;
        this.following = following;
    }

}
