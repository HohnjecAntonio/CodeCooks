package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReceptSastojciRepository extends JpaRepository<ReceptSastojci, Long> {

    ReceptSastojci findByReceptAndSastojak(Recept recept, Sastojak sastojak);

}
