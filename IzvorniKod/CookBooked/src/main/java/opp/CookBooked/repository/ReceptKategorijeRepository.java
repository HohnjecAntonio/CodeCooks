package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceptKategorijeRepository extends JpaRepository<ReceptKategorije, Long> {

    ReceptKategorije findByReceptAndKategorija(Recept recept, Kategorija kategorija);


}
