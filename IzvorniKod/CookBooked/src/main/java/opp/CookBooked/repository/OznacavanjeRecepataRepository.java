package opp.CookBooked.repository;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.OznacavanjeRecepata;
import opp.CookBooked.model.Recept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

public interface OznacavanjeRecepataRepository extends JpaRepository<OznacavanjeRecepata, Long> {

    OznacavanjeRecepata findByKorisnikAndRecept(Korisnik korisnik, Recept recept);

    @Query("SELECT NEW Korisnik(or.korisnik.idKorisnik, or.korisnik.korisnickoIme) FROM OznacavanjeRecepata or WHERE or.recept.idRecept = :idRecept")
    List<Korisnik> findAllByRecept(long idRecept);


}
