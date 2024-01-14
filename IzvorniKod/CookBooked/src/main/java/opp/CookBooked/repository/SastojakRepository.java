package opp.CookBooked.repository;

import opp.CookBooked.model.Sastojak;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SastojakRepository extends JpaRepository<Sastojak, Long> {

    Sastojak findByIdSastojak(long idSastojak);

    Sastojak findByNazivSastojak(String nazivSastojak);

}
