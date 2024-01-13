package opp.CookBooked.service;

import opp.CookBooked.model.*;

import java.util.List;

public interface VrsteKuhinjaReceptaService {
    VrsteKuhinjaRecepta dodajVrstuKuhinjeReceptu(Recept recept, VrstaKuhinje vrstaKuhinje);

    List<VrstaKuhinje> findAllByRecept(long idRecept);

}
