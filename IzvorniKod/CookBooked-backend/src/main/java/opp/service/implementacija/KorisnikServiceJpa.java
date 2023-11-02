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
        return korisnikRepo.save(korisnik);
    }

}
