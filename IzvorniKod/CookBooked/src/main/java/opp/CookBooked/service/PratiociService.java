package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;

public interface PratiociService {
    Pratioci followUser(Korisnik pracujeKorisnik, Korisnik pratiKorisnik);

}
