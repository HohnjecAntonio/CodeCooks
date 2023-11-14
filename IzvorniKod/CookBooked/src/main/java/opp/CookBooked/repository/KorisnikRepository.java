package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KorisnikRepository  extends JpaRepository<Korisnik, Long> {
    int countByKorisnickoIme(String KorisnickoIme);
}