package opp.CookBooked.repository;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.OznacavanjeRecepata;
import opp.CookBooked.model.Recept;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OznacavanjeRecepataRepository extends JpaRepository<OznacavanjeRecepata, Long> {

    OznacavanjeRecepata findByKorisnikAndRecept(Korisnik korisnik, Recept recept);


}
