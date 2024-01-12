package opp.CookBooked.repository;

import opp.CookBooked.model.Kategorija;
import org.springframework.data.jpa.repository.JpaRepository;

public interface KategorijaRepository extends JpaRepository<Kategorija, Long> {

    Kategorija findByNazivKategorija(String nazivKategorija);

}
