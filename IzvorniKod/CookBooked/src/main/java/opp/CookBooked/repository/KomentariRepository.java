package opp.CookBooked.repository;

import opp.CookBooked.model.Komentar;
import opp.CookBooked.model.KomentariRecept;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KomentariRepository extends JpaRepository<Komentar, Long> {

    @Query("SELECT k FROM Komentar k WHERE k.idKomentar = :idKomentar")
    Komentar findByIdKomentar(long idKomentar);

    @Query("SELECT k FROM Komentar k WHERE k.korisnik.idKorisnik = :idKorisnik")
    List<Komentar> findAllByIdKorisnik(long idKorisnik);

    @Query("SELECT NEW Komentar(kr.id, kr.komentar.korisnik, kr.komentar.opisKomentar, kr.komentar.datumKomentar) FROM KomentariRecept kr WHERE kr.recept.idRecept = :idRecept")
    List<Komentar> findAllByRecept(long idRecept);

}
