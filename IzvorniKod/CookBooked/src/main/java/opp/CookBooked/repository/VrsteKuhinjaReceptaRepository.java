package opp.CookBooked.repository;

import opp.CookBooked.model.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VrsteKuhinjaReceptaRepository extends JpaRepository<VrsteKuhinjaRecepta, Long> {

    @Query("SELECT NEW VrstaKuhinje(k.idVrstaKuhinje, k.nazivVrstaKuhinje) FROM VrstaKuhinje k")
    List<VrstaKuhinje> findAllVrsteKuhinje();

    @Query("SELECT k FROM VrstaKuhinje k WHERE k.idVrstaKuhinje = :idVrstaKuhinje")
    VrstaKuhinje findByIdVK(long idVrstaKuhinje);

    @Query("SELECT k FROM VrsteKuhinjaRecepta k WHERE k.recept.idRecept = :idRecept AND k.vrstaKuhinje.idVrstaKuhinje = :idVrstaKuhinje")
    VrsteKuhinjaRecepta findByReceptAndVrstaKuhinje(long idRecept, long idVrstaKuhinje);

    @Query("SELECT k FROM VrsteKuhinjaRecepta k WHERE k.recept.idRecept = :idRecept")
    VrsteKuhinjaRecepta findByReceptId(long idRecept);

    @Query("SELECT NEW VrstaKuhinje(vr.vrstaKuhinje.idVrstaKuhinje, vr.vrstaKuhinje.nazivVrstaKuhinje) FROM VrsteKuhinjaRecepta vr WHERE vr.recept.idRecept = :idRecept")
    List<VrstaKuhinje> findAllByRecept(long idRecept);

}
