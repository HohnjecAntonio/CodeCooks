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

    @Query("SELECT r FROM Recept r WHERE r.korisnik.idKorisnik =: idKorisnik")
    List<Recept> findReceptByKorisnikId(long idKorisnik) throws Exception;

    @Query("SELECT r.saved FROM Recept r WHERE r.idRecept = :idRecept")
    Set<Korisnik> findUsersWhoSavedRecipe(@Param("idRecept") Long idRecept);

    @Query("SELECT r.liked FROM Recept r WHERE r.idRecept = :idRecept")
    Set<Korisnik> findUsersWhoLikedRecipe(@Param("idRecept") Long idRecept);
}

