package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;

import java.util.List;
import java.util.Set;

public interface KorisnikService {
    List<Korisnik> listAll();

    Korisnik createKorisnik(Korisnik korisnik) throws Exception;

    Korisnik findByKorisnickoIme(String korisnickoIme);

    Korisnik findByIdKorisnik(long iDKorisnik);

    Korisnik fetch(long iDKorisnik) throws Throwable;

    Korisnik update(long idKorisnik, Korisnik updatedKorisnik) throws Exception;

    Korisnik deleteKorisnik(long iDKorisnik);
}
