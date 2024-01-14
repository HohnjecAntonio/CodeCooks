package opp.CookBooked.repository;

import opp.CookBooked.model.Kategorija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KategorijaRepository extends JpaRepository<Kategorija, Long> {

    Kategorija findByNazivKategorija(String nazivKategorija);

    @Query("SELECT new Kategorija(k.idKategorija, k.nazivKategorija) FROM Kategorija k")
    List<Kategorija> findAll();

    @Query("SELECT k FROM Kategorija k WHERE k.idKategorija = :idKategorija")
    Kategorija findByIdKategorija(long idKategorija);

    @Query("SELECT NEW Kategorija(rk.kategorija.nazivKategorija) FROM ReceptKategorije rk WHERE rk.recept.idRecept = :idRecept")
    List<Kategorija> findAllByRecept(long idRecept);

}
