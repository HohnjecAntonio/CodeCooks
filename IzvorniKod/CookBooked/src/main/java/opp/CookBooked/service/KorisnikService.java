package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;

import java.util.List;
import java.util.Optional;

public interface KorisnikService {
    List<Korisnik> listAll();
    Korisnik createKorisnik(Korisnik korisnik);
    Optional<Korisnik> findByKorisnickoIme(String korisnickoIme);
}
