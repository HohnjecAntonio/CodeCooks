package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KorisnikRepository  extends JpaRepository<Korisnik, Long> {
    int countByKorisnickoIme(String KorisnickoIme);

    Optional<Korisnik> findByKorisnickoIme(String korisnickoIme);

    Optional<Korisnik> findByIdKorisnik(long iDKorisnik);

    long countByEmailKorisnik(String emailKorisnik);
}