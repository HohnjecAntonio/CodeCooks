package opp.CookBooked.service;

import opp.CookBooked.model.KomentariRecept;
import opp.CookBooked.model.OznacavanjeRecepata;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface KomentariReceptService {

    KomentariRecept findByReceptIdAndAutorIdAAndKomentarId(long idRecept, long idKorisnik, long idKomentar);

    String obrisiKomentareReceptByKorisnik(long idRecept);

    List<KomentariRecept> findReceptsByKomentar(long idRecept);

}
