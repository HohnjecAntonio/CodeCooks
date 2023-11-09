package opp.CookBooked.service.implementacija;

import opp.CookBooked.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import opp.CookBooked.service.KorisnikService;
import opp.CookBooked.repository.KorisnikRepository;
import opp.CookBooked.model.Korisnik;

import java.util.List;
import java.util.Optional;

@Service
public class KorisnikServiceJpa implements KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepo;

    @Override
    public List<Korisnik> listAll(){
        return korisnikRepo.findAll();
    }

    @Override
    public Korisnik createKorisnik(Korisnik korisnik) {
        Assert.notNull(korisnik, "Objekt korisnik nije valjan");
        Assert.isNull(korisnik.getIDKorisnik(), "IDKorisnika mora biti null, ne " + korisnik.getIDKorisnik());
        if (korisnikRepo.countByKorisnickoIme(korisnik.getKorisnickoIme()) > 0) {
            throw new RequestDeniedException(
                    "Korisničko ime je zauzeto"
            );
       }
        return korisnikRepo.save(korisnik);
    }

    @Override
    public Optional<Korisnik> findByKorisnickoIme(String korisnickoIme) {
        Assert.notNull(korisnickoIme, "Parametar korisnickoIme mora biti naveden");
        return korisnikRepo.findByKorisnickoIme(korisnickoIme);
    }
}
