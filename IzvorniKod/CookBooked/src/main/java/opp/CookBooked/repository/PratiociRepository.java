package opp.CookBooked.repository;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PratiociRepository extends JpaRepository<Pratioci, Long> {

    Pratioci findByFollowerAndFollowing(Korisnik follower, Korisnik following);

}
