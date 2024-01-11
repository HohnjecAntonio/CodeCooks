package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VrsteKuhinjaReceptaRepository extends JpaRepository<VrsteKuhinjaRecepta, Long> {

    VrsteKuhinjaRecepta findByReceptAndVrstaKuhinje(Recept recept, VrstaKuhinje vrstaKuhinje);

}
