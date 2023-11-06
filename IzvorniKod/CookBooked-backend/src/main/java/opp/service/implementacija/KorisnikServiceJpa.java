package opp.service.implementacija;

import opp.repository.KorisnikRepository;
import opp.service.KorisnikService;
import opp.model.Korisnik;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;

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
    public Optional findById(long iDKorisnik) {
        return korisnikRepo.findById(iDKorisnik);
    }

    @Override
    public Optional findByUsername(String korisnickoIme) {
        Assert.notNull(korisnickoIme, "Potrebno je unijeti korisničko ime.");
        return korisnikRepo.findByUsername(korisnickoIme);
    }

    @Override
    public Korisnik fetch(long iDKorisnik) {
        return findById(iDKorisnik).orElseThrow(
                () -> new EntityMissingException(Korisnik.class, iDKorisnik));
    }

    @Override
    public Korisnik deleteKorisnik(long iDKorisnik) {
        Korisnik korisnik = fetch(iDKorisnik);
        korisnikRepo.delete(korisnik);
        return korisnik;
    }

}
