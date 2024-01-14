package opp.CookBooked.service;

import opp.CookBooked.model.*;

import java.util.List;

public interface VrsteKuhinjaReceptaService {
    VrsteKuhinjaRecepta dodajVrstuKuhinjeReceptu(long idRecept, long idVrstaKuhinje) throws Exception;

    List<VrstaKuhinje> findAllVrsteKuhinje();

    List<VrstaKuhinje> findAllByRecept(long idRecept);

}
