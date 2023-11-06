package opp.service;

import opp.model.Korisnik;

import java.util.List;

public interface KorisnikService {
    List<Korisnik> listAll();

    Korisnik fetch(long iDKorisnik);
    Korisnik createKorisnik(Korisnik korisnik);

    Optional<Korisnik> findById(long iDKorisnik);

    Optional<Korisnik> findByUsername(String korisnickoIme);

    Korisnik deleteKorisnik(long iDKorisnik);
}
