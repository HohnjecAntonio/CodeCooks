package opp.CookBooked.service.implementacija;

import opp.CookBooked.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private PasswordEncoder pswdEncoder;

    @Override
    public List<Korisnik> listAll(){
        return korisnikRepo.findAll();
    }

    @Override
    public Korisnik createKorisnik(String korisnickoIme, String lozinkaKorisnik, String emailKorisnik) {
        Assert.notNull(korisnickoIme, "Korisnicko ime mora biti predano");
        Assert.notNull(emailKorisnik, "Email korisnika mora biti predan");
        Assert.hasLength(korisnickoIme, "Korisnicko ime ne smije biti prazno");
        Assert.isTrue(lozinkaKorisnik != null && lozinkaKorisnik.length() >= 6,
                "Lozinka mora imati minimalno 6 znakova.");

        if (korisnikRepo.countByKorisnickoIme(korisnickoIme) > 0) {
            throw new RequestDeniedException(
                    "Korisničko ime je zauzeto"
            );
        }
        if (korisnikRepo.countByEmailKorisnik(emailKorisnik) > 0) {
            throw new RequestDeniedException(
                    "Email je zauzet"
            );
        }

        return korisnikRepo.save(new Korisnik(korisnickoIme, pswdEncoder.encode(lozinkaKorisnik), emailKorisnik));
    }


    @Override
    public Optional<Korisnik> findByKorisnickoIme(String korisnickoIme) {
        Assert.notNull(korisnickoIme, "Parametar korisnickoIme mora biti naveden");
        return korisnikRepo.findByKorisnickoIme(korisnickoIme);
    }

    @Override
    public Optional<Korisnik> findByIdKorisnik(long iDKorisnik) {
        return korisnikRepo.findByIdKorisnik(iDKorisnik);
    }

    @Override
    public Korisnik fetch(long iDKorisnik) {
        return findByIdKorisnik(iDKorisnik).orElseThrow(
                () -> new EntityMissingException(Korisnik.class, iDKorisnik));
    }

    @Override
    public Korisnik deleteKorisnik(long iDKorisnik) {
        Korisnik korisnik = fetch(iDKorisnik);
        korisnikRepo.delete(korisnik);
        return korisnik;
    }
}
