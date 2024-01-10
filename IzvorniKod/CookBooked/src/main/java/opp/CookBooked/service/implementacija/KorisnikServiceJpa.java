package opp.CookBooked.service.implementacija;

import jakarta.transaction.Transactional;
import opp.CookBooked.model.Recept;
import opp.CookBooked.repository.ReceptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import opp.CookBooked.service.KorisnikService;
import opp.CookBooked.repository.KorisnikRepository;
import opp.CookBooked.model.Korisnik;

import java.util.List;
import java.util.Set;

@Service
public class KorisnikServiceJpa implements KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepo;

    @Autowired
    private ReceptRepository receptRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Korisnik> listAll(){
        return korisnikRepo.findAll();
    }

    @Override
    public Korisnik createKorisnik(Korisnik korisnik) throws Exception {

        Korisnik noviKorisnik = new Korisnik();
        noviKorisnik.setImeKorisnik(korisnik.getImeKorisnik());
        noviKorisnik.setPrezimeKorisnik(korisnik.getPrezimeKorisnik());
        noviKorisnik.setEmailKorisnik(korisnik.getEmailKorisnik());
        noviKorisnik.setKorisnickoIme(korisnik.getKorisnickoIme());
        noviKorisnik.setLozinkaKorisnik(passwordEncoder.encode(korisnik.getLozinkaKorisnik()));

        return korisnikRepo.save(noviKorisnik);
    }

    @Override
    public Recept saveRecipeForUser(long korisnikId, long receptId) {
        Korisnik korisnik = korisnikRepo.findByIdKorisnik(korisnikId);
        Recept recept = receptRepo.findByIdRecept(receptId);

        if (korisnik.getSpremljeniRecepti().contains(recept)) {
            korisnik.getSpremljeniRecepti().remove(recept);
        } else korisnik.getSpremljeniRecepti().add(recept);

        korisnikRepo.save(korisnik);

        return recept;
    }

    @Override
    public Set<Recept> getSavedRecipesForUser(long korisnikId) {
        return korisnikRepo.findSavedRecipesByKorisnikId(korisnikId);
    }

    @Override
    public Set<Korisnik> getUsersWhoSavedRecipe(long receptId) {
        return receptRepo.findUsersWhoSavedRecipe(receptId);
    }

    @Override
    public Recept likeRecipe(long korisnikId, long receptId) {
        Korisnik korisnik = korisnikRepo.findByIdKorisnik(korisnikId);
        Recept recept = receptRepo.findByIdRecept(receptId);

        if (korisnik.getLikedRecepti().contains(recept)) {
            korisnik.getLikedRecepti().remove(recept);
        } else korisnik.getLikedRecepti().add(recept);

        korisnikRepo.save(korisnik);
        return recept;
    }

    @Override
    public Set<Recept> getLikedRecipesForUser(long korisnikId) {
        return korisnikRepo.findLikedRecipesByKorisnikId(korisnikId);
    }

    @Override
    public Set<Korisnik> getUsersWhoLikedRecipe(long receptId) {
        return receptRepo.findUsersWhoLikedRecipe(receptId);
    }

    @Override
    public void addFollower(Korisnik follower, Korisnik following) {
        if (follower.getFollows().contains(following)) {
            // Already following, so unfollow
            follower.removeFollower(following);
        } else {
            // Not following, so follow
            follower.addFollower(following);
        }
        korisnikRepo.save(follower);
    }

    @Override
    public Korisnik findByKorisnickoIme(String korisnickoIme) {
        Assert.notNull(korisnickoIme, "Polje korisnickoIme ne smije biti prazno!");
        return korisnikRepo.findByKorisnickoIme(korisnickoIme);
    }

    @Override
    public Korisnik findByIdKorisnik(long iDKorisnik) {
        return korisnikRepo.findByIdKorisnik(iDKorisnik);
    }

    @Override
    public Korisnik fetch(long iDKorisnik) {
        return findByIdKorisnik(iDKorisnik);
    }

    @Override
    public Korisnik deleteKorisnik(long iDKorisnik) {
        Korisnik korisnik = fetch(iDKorisnik);
        korisnikRepo.delete(korisnik);
        return korisnik;
    }
}
