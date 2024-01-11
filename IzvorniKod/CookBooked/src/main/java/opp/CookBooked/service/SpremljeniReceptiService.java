package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;
import opp.CookBooked.model.SpremljeniRecepti;

public interface SpremljeniReceptiService {

    SpremljeniRecepti spremiRecept(Korisnik korisnik, Recept recept);

}
