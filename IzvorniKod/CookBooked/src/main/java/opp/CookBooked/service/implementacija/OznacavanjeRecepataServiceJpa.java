package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.OznacavanjeRecepata;
import opp.CookBooked.model.Recept;
import opp.CookBooked.repository.OznacavanjeRecepataRepository;
import opp.CookBooked.service.OznacavanjeRecepataService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OznacavanjeRecepataServiceJpa implements OznacavanjeRecepataService {

    @Autowired
    private OznacavanjeRecepataRepository oznRecRepo;

    @Override
    public OznacavanjeRecepata oznaciRecept(Korisnik korisnik, Recept recept) {
        OznacavanjeRecepata existingRelationship = oznRecRepo
                .findByKorisnikAndRecept(korisnik, recept);

        if (existingRelationship != null) {
            oznRecRepo.delete(existingRelationship);
            return existingRelationship;
        } else {
            OznacavanjeRecepata spremRec = new OznacavanjeRecepata(korisnik, recept);
            return oznRecRepo.save(spremRec);
        }
    }

    @Override
    public List<Korisnik> findAllByRecept(long idRecept) {
        return oznRecRepo.findAllByRecept(idRecept);
    }
}
