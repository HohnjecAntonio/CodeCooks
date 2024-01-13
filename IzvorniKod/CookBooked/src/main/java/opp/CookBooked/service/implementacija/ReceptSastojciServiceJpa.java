package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Recept;
import opp.CookBooked.model.ReceptKategorije;
import opp.CookBooked.model.ReceptSastojci;
import opp.CookBooked.model.Sastojak;
import opp.CookBooked.repository.ReceptSastojciRepository;
import opp.CookBooked.service.ReceptSastojciService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceptSastojciServiceJpa implements ReceptSastojciService {

    @Autowired
    private ReceptSastojciRepository recSasRepo;

    @Override
    public ReceptSastojci dodajSastojakReceptu(Recept recept, Sastojak sastojak) {
        ReceptSastojci existingRelationship = recSasRepo
                .findByReceptAndSastojak(recept, sastojak);

        if (existingRelationship != null) {
            recSasRepo.delete(existingRelationship);
            return existingRelationship;
        } else {
            ReceptSastojci spremRec = new ReceptSastojci(recept, sastojak);
            return recSasRepo.save(spremRec);
        }
    }

    @Override
    public List<Sastojak> findAllByRecept(long idRecept) {
        return recSasRepo.findAllByRecept(idRecept);
    }
}
