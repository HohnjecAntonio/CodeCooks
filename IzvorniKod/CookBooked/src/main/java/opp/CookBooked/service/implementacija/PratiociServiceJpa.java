package opp.CookBooked.service.implementacija;

import opp.CookBooked.dto.FollowDTO;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;
import opp.CookBooked.repository.PratiociRepository;
import opp.CookBooked.service.PratiociService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class PratiociServiceJpa implements PratiociService {

    @Autowired
    private PratiociRepository pratiociRepo;

    @Override
    public Pratioci followUser(Korisnik follower, Korisnik following) {
        try {
            Pratioci existingRelationship = pratiociRepo
                    .findByFollowerAndFollowing(follower, following);

            if (existingRelationship != null) {
                pratiociRepo.delete(existingRelationship);
                return existingRelationship;
            } else {
                Pratioci pratioci = new Pratioci(follower, following);
                return pratioci;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Pratioci> obrisiFollow(long idFollower) {
        try {
            List<Pratioci> existingRelationship = pratiociRepo
                    .findAllByFollwerId(idFollower);

            if (existingRelationship != null)
                pratiociRepo.deleteAll(existingRelationship);
                return existingRelationship;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public List<FollowDTO> pronadjiOneKojePratim(long idKorisnik) throws Exception {
        try {
            List<FollowDTO> followers = new ArrayList<>();
            List<Korisnik> korisnici = pratiociRepo.findAllByFollower(idKorisnik);

            for (Korisnik k : korisnici) {
                followers.add(new FollowDTO(k.getIdKorisnik(), k.getKorisnickoIme()));
            }

            return followers;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<FollowDTO> pronadjiOneKojiMePrate(long idKorisnik) throws Exception {
        try {

            List<FollowDTO> followers = new ArrayList<>();
            List<Korisnik> korisnici = pratiociRepo.findAllByFollowing(idKorisnik);

            for (Korisnik k : korisnici) {
                followers.add(new FollowDTO(k.getIdKorisnik(), k.getKorisnickoIme()));
            }

            return followers;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}