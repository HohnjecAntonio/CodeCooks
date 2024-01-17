package opp.CookBooked.service;

import opp.CookBooked.dto.FollowDTO;
import opp.CookBooked.dto.ProfilDTO;
import opp.CookBooked.dto.ProfilDrugogKorisnikaDTO;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;

import java.util.List;
import java.util.Set;

public interface KorisnikService {
    List<Korisnik> listAll();

    ProfilDTO fetchProfil(String jwt) throws Exception;

    Korisnik createKorisnik(Korisnik korisnik) throws Exception;

    Korisnik findByKorisnickoIme(String korisnickoIme);

    Korisnik findByIdKorisnik(long idKorisnik);

    ProfilDrugogKorisnikaDTO fetchZaProfil(String korisnickoIme) throws Exception;

    Korisnik fetch(long idKorisnik) throws Exception;

    Korisnik updateKorisnik(long idKorisnik, ProfilDTO updatedKorisnik) throws Exception;

    Korisnik getKorisnikFromJWT(String jwt);

    Korisnik deleteKorisnik(long idKorisnik) throws Exception;
}