package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Kategorija;
import opp.CookBooked.model.Recept;
import opp.CookBooked.model.ReceptKategorije;
import opp.CookBooked.model.SpremljeniRecepti;
import opp.CookBooked.repository.ReceptKategorijeRepository;
import opp.CookBooked.service.ReceptKategorijeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
public class ReceptKategorijeServiceJpa implements ReceptKategorijeService {

    @Autowired
    private ReceptKategorijeRepository reKatRepo;


    @Override
    public ReceptKategorije dodajKategorijuReceptu(Recept recept, Kategorija kategorija) {

        ReceptKategorije existingRelationship = reKatRepo
                .findByReceptAndKategorija(recept, kategorija);

        if (existingRelationship != null) {
            reKatRepo.delete(existingRelationship);
            return existingRelationship;
        } else {
            ReceptKategorije spremRec = new ReceptKategorije(recept, kategorija);
            return reKatRepo.save(spremRec);
        }

    }
}
