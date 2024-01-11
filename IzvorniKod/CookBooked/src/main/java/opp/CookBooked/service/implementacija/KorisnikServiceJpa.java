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

import java.util.ArrayList;
import java.util.List;

@Service
public class KorisnikServiceJpa implements KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepo;

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
    public Korisnik update(long idKorisnik, Korisnik updatedKorisnik) throws Exception {
        return korisnikRepo.findById(idKorisnik).map(korisnik -> {
            korisnik.setKorisnickoIme(updatedKorisnik.getKorisnickoIme());
            korisnik.setLozinkaKorisnik(updatedKorisnik.getLozinkaKorisnik());
            korisnik.setEmailKorisnik(updatedKorisnik.getEmailKorisnik());

            return korisnikRepo.save(korisnik);
        }).orElseThrow(() -> new RuntimeException("Korisnik not found with id " + idKorisnik));

    }

    @Override
    public Korisnik deleteKorisnik(long iDKorisnik) {
        Korisnik korisnik = fetch(iDKorisnik);
        korisnikRepo.delete(korisnik);
        return korisnik;
    }
}
