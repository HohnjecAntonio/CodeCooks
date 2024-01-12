package opp.CookBooked.repository;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface ReceptRepository extends JpaRepository<Recept, Long> {
    Recept findByIdRecept(long iDRecept);

    @Query("SELECT New Recept(r.recept.idRecept, r.recept.autor, r.recept.nazivRecept, r.recept.Priprema) FROM SpremljeniRecepti r WHERE r.korisnik.idKorisnik = :idKorisnik")
    List<Recept> findSpremljeniReceptiByIdKorisnik(long idKorisnik) throws Exception;
}

