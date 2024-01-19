package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReceptKategorijeRepository extends JpaRepository<ReceptKategorije, Long> {

    @Query("SELECT k FROM ReceptKategorije k WHERE k.recept.idRecept = :idRecept AND k.kategorija.idKategorija = :idKategorija")
    ReceptKategorije findByReceptAndKategorija(Long idRecept, Long idKategorija);

    @Query("SELECT k FROM ReceptKategorije k WHERE k.recept.idRecept = :idRecept")
    ReceptKategorije findByReceptId(long idRecept);

    @Query("SELECT k FROM ReceptKategorije k WHERE k.kategorija.idKategorija = :idKategorija")
    List<ReceptKategorije> findByKategorije(long idKategorija);
}
