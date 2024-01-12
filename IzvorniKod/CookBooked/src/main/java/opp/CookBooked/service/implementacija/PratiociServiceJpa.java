package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;
import opp.CookBooked.repository.PratiociRepository;
import opp.CookBooked.service.PratiociService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PratiociServiceJpa implements PratiociService {

    @Autowired
    private PratiociRepository pratiociRepo;

    @Override
    public Pratioci followUser(Korisnik follower, Korisnik following) {
        Pratioci existingRelationship = pratiociRepo
                .findByFollowerAndFollowing(follower, following);

        if (existingRelationship != null) {
            pratiociRepo.delete(existingRelationship);
            return existingRelationship;
        } else {
            Pratioci pratioci = new Pratioci(follower, following);
            return pratiociRepo.save(pratioci);
        }
    }

}
