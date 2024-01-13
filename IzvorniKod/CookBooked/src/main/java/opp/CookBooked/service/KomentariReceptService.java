package opp.CookBooked.service;

import opp.CookBooked.model.KomentariRecept;
import org.springframework.data.repository.query.Param;

public interface KomentariReceptService {

    KomentariRecept findByReceptIdAndAutorIdAAndKomentarId(long idRecept, long idKorisnik, long idKomentar);


}
