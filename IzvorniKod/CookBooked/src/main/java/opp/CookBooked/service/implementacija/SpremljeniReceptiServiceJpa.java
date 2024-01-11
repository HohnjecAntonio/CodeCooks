package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;
import opp.CookBooked.model.Recept;
import opp.CookBooked.model.SpremljeniRecepti;
import opp.CookBooked.repository.PratiociRepository;
import opp.CookBooked.repository.SpremljeniReceptiRepository;
import opp.CookBooked.service.SpremljeniReceptiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class SpremljeniReceptiServiceJpa implements SpremljeniReceptiService {

    @Autowired
    private SpremljeniReceptiRepository sprRecRepo;

    @Override
    public SpremljeniRecepti spremiRecept(Korisnik korisnik, Recept recept) {
        SpremljeniRecepti existingRelationship = sprRecRepo
                .findByKorisnikAndRecept(korisnik, recept);

        if (existingRelationship != null) {
            sprRecRepo.delete(existingRelationship);
            return existingRelationship;
        } else {
            SpremljeniRecepti spremRec = new SpremljeniRecepti(korisnik, recept);
            return sprRecRepo.save(spremRec);
        }
    }
}
