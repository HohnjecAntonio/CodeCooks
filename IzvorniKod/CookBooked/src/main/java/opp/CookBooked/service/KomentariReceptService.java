package opp.CookBooked.service;

import opp.CookBooked.model.KomentariRecept;

public interface KomentariReceptService {

    KomentariRecept findByIdReceptAndIdKorisnik(long idRecept, long idKorisnik);

}
