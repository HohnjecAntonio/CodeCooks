package opp.CookBooked.repository;

import opp.CookBooked.model.Kategorija;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface KategorijaRepository extends JpaRepository<Kategorija, Long> {

    Kategorija findByNazivKategorija(String nazivKategorija);

    @Query("SELECT NEW Kategorija(rk.kategorija.nazivKategorija) FROM ReceptKategorije rk WHERE rk.recept.idRecept = :idRecept")
    List<Kategorija> findAllByRecept(long idRecept);

}
