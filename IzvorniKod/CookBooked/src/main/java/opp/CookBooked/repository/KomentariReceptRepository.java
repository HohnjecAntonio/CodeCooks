package opp.CookBooked.repository;

import opp.CookBooked.model.KomentariRecept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface KomentariReceptRepository extends JpaRepository<KomentariRecept, Long> {

    @Query("SELECT kr FROM KomentariRecept kr WHERE kr.recept.idRecept = :idRecept AND kr.recept.autor.idKorisnik = :idKorisnik")
    KomentariRecept findByIdReceptAndIdKorisnik(long idRecept, long idKorisnik);

}
