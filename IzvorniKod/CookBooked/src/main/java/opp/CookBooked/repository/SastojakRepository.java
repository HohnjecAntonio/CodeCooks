package opp.CookBooked.repository;

import opp.CookBooked.model.Sastojak;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface SastojakRepository extends JpaRepository<Sastojak, Long> {

    Sastojak findByIdSastojak(long idSastojak);

    @Query("SELECT new Sastojak(s.idSastojak, s.nazivSastojak) FROM Sastojak s WHERE s.nazivSastojak = :nazivSastojak")
    Sastojak findByNazivSastojak(String nazivSastojak);

}
