package opp.CookBooked.repository;

import opp.CookBooked.dto.ReceptDTO;
import opp.CookBooked.model.Recept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Set;

public interface ReceptRepository extends JpaRepository<Recept, Long> {
    Recept findByIdRecept(long iDRecept);

    @Query("SELECT NEW Recept(r.recept.idRecept, r.recept.autor, r.recept.nazivRecept, r.recept.Priprema, r.recept.Oznaka, r.recept.slikaRecept, r.recept.videoRecept, r.recept.vrijemeObjave, r.recept.vrijemeKuhanja) FROM SpremljeniRecepti r WHERE r.korisnik.idKorisnik = :idKorisnik")
    List<Recept> findSpremljeniReceptiByIdKorisnik(long idKorisnik) throws Exception;

    @Query("SELECT NEW Recept(r.idRecept, r.autor, r.nazivRecept, r.Priprema, r.Oznaka, r.slikaRecept, r.videoRecept, r.vrijemeObjave, r.vrijemeKuhanja) FROM Recept r WHERE r.autor.idKorisnik = :idKorisnik")
    List<Recept> findRecepteByAutor(long idKorisnik) throws Exception;
}

