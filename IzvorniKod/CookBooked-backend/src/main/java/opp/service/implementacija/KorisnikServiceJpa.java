package opp.service.implementacija;

import opp.repository.KorisnikRepository;
import opp.service.EntityMissingException;
import opp.service.KorisnikService;
import opp.model.Korisnik;
import opp.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class KorisnikServiceJpa implements KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepo;
    @Override
    public List<Korisnik> listAll() {
        return korisnikRepo.findAll();
    }

    @Override
    public Korisnik fetch(String korisnickoIme) {
        return findByKorisnickoIme(korisnickoIme).orElseThrow(
                () -> new EntityMissingException(Korisnik.class, korisnickoIme)
        );
    }

    @Override
    public Korisnik createKorisnik(Korisnik korisnik) {
        validate(korisnik);
        Assert.isNull(korisnik.getIDKorisnik(),
                "Korisnik ID must be null, not: " + korisnik.getIDKorisnik()
        );
        if (korisnikRepo.countByKorisnickoIme(korisnik.getKorisnickoIme()) > 0)
            throw new RequestDeniedException(
                    "Korisnik with username " + korisnik.getKorisnickoIme() + " already exists."
            );
        return korisnikRepo.save(korisnik);
    }

    @Override
    public Optional<Korisnik> findById(String korisnickoIme) {
        return korisnikRepo.findByKorisnickoIme(korisnickoIme);
    }

    @Override
    public Optional<Korisnik> findByKorisnickoIme(String korisnickoIme) {
        return korisnikRepo.findByKorisnickoIme(korisnickoIme);
    }

    @Override
    public Korisnik updateKorisnik(Korisnik korisnik) {
        validate(korisnik);
        String korisnickoIme = korisnik.getKorisnickoIme();
        if (!korisnikRepo.existsByKorisnickoIme(korisnickoIme))
            throw new EntityMissingException(Korisnik.class, korisnickoIme);
        return korisnikRepo.save(korisnik);
    }

    @Override
    public Korisnik deleteKorisnik(String korisnickoIme) {
        Korisnik korisnik = fetch(korisnickoIme);
        korisnikRepo.delete(korisnik);
        return korisnik;
    }

    private void validate(Korisnik korisnik) {
        Assert.notNull(korisnik, "Korisnik object must be given");
        String korisnckoIme = korisnik.getKorisnickoIme();
        Assert.hasText(korisnckoIme, "Korisnicko ime must be given");
    }

}