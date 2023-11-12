package opp.repository;

import opp.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface KorisnikRepository  extends JpaRepository<Korisnik, Long> {
    Optional<Korisnik> findByKorisnickoIme(String korisnickoIme);
    int countByKorisnickoIme(String korisnickoIme);
    boolean existsByKorisnickoIme(String korisnickoIme);
}