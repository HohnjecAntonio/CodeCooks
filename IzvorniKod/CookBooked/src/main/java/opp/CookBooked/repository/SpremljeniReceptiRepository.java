package opp.CookBooked.repository;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;
import opp.CookBooked.model.Recept;
import opp.CookBooked.model.SpremljeniRecepti;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SpremljeniReceptiRepository extends JpaRepository<SpremljeniRecepti, Long> {

    SpremljeniRecepti findByKorisnikAndRecept(Korisnik korisnik, Recept recept);

}
