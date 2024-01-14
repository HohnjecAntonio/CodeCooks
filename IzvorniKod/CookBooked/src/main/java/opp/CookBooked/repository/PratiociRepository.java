package opp.CookBooked.repository;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PratiociRepository extends JpaRepository<Pratioci, Long> {

    Pratioci findByFollowerAndFollowing(Korisnik follower, Korisnik following);

    @Query("SELECT p FROM Pratioci p WHERE p.follower.idKorisnik = :idFollower OR p.following.idKorisnik = :idFollower")
    List<Pratioci> findAllByFollwerId(long idFollower);

    @Query("SELECT New Korisnik(p.id, p.follower.korisnickoIme) FROM Pratioci p WHERE p.following.idKorisnik = :idKorisnik")
    List<Korisnik> findAllByFollower(long idKorisnik) throws Exception;

    @Query("SELECT New Korisnik(p.id, p.following.korisnickoIme) FROM Pratioci p WHERE p.follower.idKorisnik = :idKorisnik")
    List<Korisnik> findAllByFollowing(long idKorisnik) throws Exception;

}
