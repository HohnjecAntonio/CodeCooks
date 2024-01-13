package opp.CookBooked.service;

import opp.CookBooked.model.Komentar;
import opp.CookBooked.model.KomentariRecept;
import opp.CookBooked.model.Recept;

import java.util.List;

public interface KomentariService {

    KomentariRecept dodajKomentar(Komentar komentar, long idRecept);

    String urediKomentar(long idKomentar, Komentar updatedKomentar);

    String obrisiKomentar(long idKomentar, long idRecept);

    List<Komentar> findAllByRecept(long idRecept);

    Komentar findById(long idKomentar);

}
