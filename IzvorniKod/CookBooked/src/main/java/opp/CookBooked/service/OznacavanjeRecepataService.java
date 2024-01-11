package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.OznacavanjeRecepata;
import opp.CookBooked.model.Recept;

public interface OznacavanjeRecepataService {

    OznacavanjeRecepata oznaciRecept(Korisnik korisnik, Recept recept);


}
