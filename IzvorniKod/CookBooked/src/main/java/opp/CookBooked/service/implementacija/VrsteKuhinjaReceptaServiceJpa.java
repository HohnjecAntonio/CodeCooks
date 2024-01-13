package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Recept;
import opp.CookBooked.model.ReceptKategorije;
import opp.CookBooked.model.VrstaKuhinje;
import opp.CookBooked.model.VrsteKuhinjaRecepta;
import opp.CookBooked.repository.VrsteKuhinjaReceptaRepository;
import opp.CookBooked.service.VrsteKuhinjaReceptaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VrsteKuhinjaReceptaServiceJpa implements VrsteKuhinjaReceptaService {

    @Autowired
    private VrsteKuhinjaReceptaRepository vrKuhRecRepo;

    @Override
    public VrsteKuhinjaRecepta dodajVrstuKuhinjeReceptu(Recept recept, VrstaKuhinje vrstaKuhinje) {
        VrsteKuhinjaRecepta existingRelationship = vrKuhRecRepo
                .findByReceptAndVrstaKuhinje(recept, vrstaKuhinje);

        if (existingRelationship != null) {
            vrKuhRecRepo.delete(existingRelationship);
            return existingRelationship;
        } else {
            VrsteKuhinjaRecepta spremRec = new VrsteKuhinjaRecepta(recept, vrstaKuhinje);
            return vrKuhRecRepo.save(spremRec);
        }
    }

    @Override
    public List<VrstaKuhinje> findAllByRecept(long idRecept) {
        return vrKuhRecRepo.findAllByRecept(idRecept);
    }
}
