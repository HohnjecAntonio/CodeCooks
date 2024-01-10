package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface KorisnikRepository  extends JpaRepository<Korisnik, Long> {
    int countByKorisnickoIme(String KorisnickoIme);

    Korisnik findByKorisnickoIme(String korisnickoIme);

    Korisnik findByIdKorisnik(long iDKorisnik);

    long countByEmailKorisnik(String emailKorisnik);

    @Query("SELECT k.spremljeniRecepti FROM Korisnik k WHERE k.idKorisnik = :idKorisnik")
    Set<Recept> findSavedRecipesByKorisnikId(@Param("idKorisnik") long idKorisnik);

    @Query("SELECT k.likedRecepti FROM Korisnik k WHERE k.idKorisnik = :idKorisnik")
    Set<Recept> findLikedRecipesByKorisnikId(@Param("idKorisnik") long idKorisnik);

}