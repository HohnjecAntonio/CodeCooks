package opp.repository;

import opp.model.Korisnik;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KorisnikRepository
extends JpaRepository<Korisnik, Long>
{

}
