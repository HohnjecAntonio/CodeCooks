package opp.CookBooked.service.implementacija;

import opp.CookBooked.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
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
    public Korisnik createKorisnik(Korisnik korisnik) throws Exception {

        Korisnik postojiKorisnik = korisnikRepo.findByKorisnickoIme(korisnik.getKorisnickoIme());

        if (postojiKorisnik != null) throw new Exception("Već postoji korisnik s ovim korisničkim imenom.");

        Korisnik noviKorisnik = new Korisnik();
        noviKorisnik.setImeKorisnik(korisnik.getImeKorisnik());
        noviKorisnik.setPrezimeKorisnik(korisnik.getPrezimeKorisnik());
        noviKorisnik.setEmailKorisnik(korisnik.getEmailKorisnik());
        noviKorisnik.setKorisnickoIme(korisnik.getKorisnickoIme());
        noviKorisnik.setLozinkaKorisnik(pswdEncoder.encode(korisnik.getLozinkaKorisnik()));

        return korisnikRepo.save(noviKorisnik);
    }


    @Override
   public Korisnik findByKorisnickoIme(String korisnickoIme) {
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
