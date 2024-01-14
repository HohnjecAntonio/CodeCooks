package opp.CookBooked.service;

import opp.CookBooked.dto.FollowDTO;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;

import java.util.List;

public interface PratiociService {
    Pratioci followUser(Korisnik pracujeKorisnik, Korisnik pratiKorisnik);

    List<Pratioci> obrisiFollow(long idFollower);

    List<FollowDTO> pronadjiOneKojePratim(long idKorisnik) throws Exception;
    List<FollowDTO> pronadjiOneKojiMePrate(long idKorisnik) throws Exception;

}
