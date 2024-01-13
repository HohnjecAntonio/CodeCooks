package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VrsteKuhinjaReceptaRepository extends JpaRepository<VrsteKuhinjaRecepta, Long> {

    VrsteKuhinjaRecepta findByReceptAndVrstaKuhinje(Recept recept, VrstaKuhinje vrstaKuhinje);

    @Query("SELECT NEW VrstaKuhinje(vr.vrstaKuhinje.nazivVrstaKuhinje) FROM VrsteKuhinjaRecepta vr WHERE vr.recept.idRecept = :idRecept")
    List<VrstaKuhinje> findAllByRecept(long idRecept);

}
