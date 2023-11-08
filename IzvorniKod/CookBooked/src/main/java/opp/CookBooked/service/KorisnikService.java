package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;

import java.util.List;

public interface KorisnikService {
    List<Korisnik> listAll();
    Korisnik createKorisnik(Korisnik korisnik);
}
