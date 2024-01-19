package opp.CookBooked.service;

import opp.CookBooked.model.Komentar;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.OznacavanjeRecepata;
import opp.CookBooked.model.Recept;

import java.util.List;

public interface OznacavanjeRecepataService {

    OznacavanjeRecepata oznaciRecept(Korisnik korisnik, Recept recept);

    List<OznacavanjeRecepata> obrisiOznaceReceptByIdKorisnik(long idKorisnik, long idRecept);

    List<Korisnik> findAllByRecept(long idRecept);

}
