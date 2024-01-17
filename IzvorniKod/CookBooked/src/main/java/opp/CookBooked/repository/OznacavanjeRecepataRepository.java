package opp.CookBooked.repository;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.OznacavanjeRecepata;
import opp.CookBooked.model.Recept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Service;

import java.util.List;

public interface OznacavanjeRecepataRepository extends JpaRepository<OznacavanjeRecepata, Long> {


    @Query("SELECT o FROM OznacavanjeRecepata o WHERE o.recept.idRecept = :idRecept")
    List<OznacavanjeRecepata> findAllByReceptIdOznaka(long idRecept);

    @Query("SELECT oznr FROM OznacavanjeRecepata oznr WHERE oznr.recept.idRecept = :idRecept AND oznr.korisnik.idKorisnik = :idKorisnik")
    OznacavanjeRecepata findByIdKorisnikAndIdRecept(long idKorisnik, long idRecept);

    @Query("SELECT NEW Korisnik(or.korisnik.idKorisnik, or.korisnik.korisnickoIme) FROM OznacavanjeRecepata or WHERE or.recept.idRecept = :idRecept")
    List<Korisnik> findAllByRecept(long idRecept);


}
