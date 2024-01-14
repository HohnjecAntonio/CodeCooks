package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;

import java.util.List;

public interface PratiociService {
    Pratioci followUser(Korisnik pracujeKorisnik, Korisnik pratiKorisnik);

    List<Pratioci> obrisiFollow(long idFollower);

    List<Korisnik> pronadjiOneKojePratim(long idKorisnik) throws Exception;
    List<Korisnik> pronadjiOneKojiMePrate(long idKorisnik) throws Exception;

}
