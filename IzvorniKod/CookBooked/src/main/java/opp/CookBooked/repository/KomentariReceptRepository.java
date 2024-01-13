package opp.CookBooked.repository;

import opp.CookBooked.model.KomentariRecept;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface KomentariReceptRepository extends JpaRepository<KomentariRecept, Long> {

    @Query("SELECT kr FROM KomentariRecept kr WHERE kr.recept.idRecept = :idRecept AND kr.komentar.idKomentar = :idKomentar AND kr.recept.autor.idKorisnik = :idKorisnik")
    KomentariRecept findByReceptIdAndAutorIdAAndKomentarId(@Param("idRecept") Long idRecept, @Param("idKomentar") Long idKomentar, @Param("idKorisnik") Long idKorisnik);


}
