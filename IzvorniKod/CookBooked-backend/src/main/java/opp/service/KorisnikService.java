package opp.service;

import opp.model.Korisnik;

import java.util.List;

public interface KorisnikService {
    List<Korisnik> listAll();

    Korisnik fetch(Long iDKorisnik);
    Korisnik createKorisnik(Korisnik korisnik);

    Optional<Korisnik> findById(Long iDKorisnik);

    Optional<Korisnik> findByUsername(String korisnickoIme);

    Korisnik deleteKorisnik(Long iDKorisnik);
}
