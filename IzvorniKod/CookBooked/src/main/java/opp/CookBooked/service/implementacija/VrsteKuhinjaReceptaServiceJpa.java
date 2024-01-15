package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Recept;
import opp.CookBooked.model.ReceptKategorije;
import opp.CookBooked.model.VrstaKuhinje;
import opp.CookBooked.model.VrsteKuhinjaRecepta;
import opp.CookBooked.repository.ReceptRepository;
import opp.CookBooked.repository.VrsteKuhinjaReceptaRepository;
import opp.CookBooked.service.ReceptService;
import opp.CookBooked.service.VrsteKuhinjaReceptaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VrsteKuhinjaReceptaServiceJpa implements VrsteKuhinjaReceptaService {

    @Autowired
    private VrsteKuhinjaReceptaRepository vrKuhRecRepo;

    @Autowired
    private ReceptRepository receptRepo;

    @Override
    public VrsteKuhinjaRecepta dodajVrstuKuhinjeReceptu(long idRecept, long idVrstaKuhinje) throws Exception {
        VrsteKuhinjaRecepta existingRelationship = vrKuhRecRepo
                .findByReceptAndVrstaKuhinje(idRecept, idVrstaKuhinje);

        if (existingRelationship != null) {
            vrKuhRecRepo.delete(existingRelationship);
            return existingRelationship;
        } else {
            Recept recept = receptRepo.findByIdRecept(idRecept);
            VrstaKuhinje vrstaKuhinje = vrKuhRecRepo.findByIdVK(idVrstaKuhinje);
            VrsteKuhinjaRecepta spremRec = new VrsteKuhinjaRecepta(recept, vrstaKuhinje);
            return vrKuhRecRepo.save(spremRec);
        }
    }

    @Override
    public String obrisiRecept(long idRecept) {
        try {
            VrsteKuhinjaRecepta vkr = vrKuhRecRepo.findByReceptId(idRecept);
            vrKuhRecRepo.delete(vkr);
            return "Uspješno brisanje";
        } catch (Exception e) {
            e.printStackTrace();
            return "Neuspjelo brisanje";
        }
    }

    @Override
    public List<VrstaKuhinje> findAllVrsteKuhinje() {
        return vrKuhRecRepo.findAllVrsteKuhinje();
    }

    @Override
    public List<VrstaKuhinje> findAllByRecept(long idRecept) {
        return vrKuhRecRepo.findAllByRecept(idRecept);
    }
}
