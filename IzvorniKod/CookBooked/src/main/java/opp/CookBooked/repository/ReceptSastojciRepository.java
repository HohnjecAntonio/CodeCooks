package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReceptSastojciRepository extends JpaRepository<ReceptSastojci, Long> {

    ReceptSastojci findByReceptAndSastojak(Recept recept, Sastojak sastojak);

    @Query("SELECT NEW Sastojak(rs.sastojak.nazivSastojak) FROM ReceptSastojci rs WHERE rs.recept.idRecept = :idRecept")
    List<Sastojak> findAllByRecept(long idRecept);

}
