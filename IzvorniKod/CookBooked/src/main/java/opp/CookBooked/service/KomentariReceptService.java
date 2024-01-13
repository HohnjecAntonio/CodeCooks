package opp.CookBooked.service;

import opp.CookBooked.model.KomentariRecept;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KomentariReceptService {

    KomentariRecept findByReceptIdAndAutorIdAAndKomentarId(long idRecept, long idKorisnik, long idKomentar);

    List<KomentariRecept> findReceptsByKomentar(long idRecept);

}
