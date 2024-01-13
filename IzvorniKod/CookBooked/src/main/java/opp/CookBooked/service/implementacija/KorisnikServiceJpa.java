package opp.CookBooked.service.implementacija;

import jakarta.transaction.Transactional;
import opp.CookBooked.config.jwtProvider;
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
    public Korisnik findByIdKorisnik(long idKorisnik) {
        return korisnikRepo.findByIdKorisnik(idKorisnik);
    }

    @Override
    public Korisnik fetch(long idKorisnik) {
        return findByIdKorisnik(idKorisnik);
    }

    @Override
    public Korisnik updateKorisnik(long idKorisnik, Korisnik updatedKorisnik) throws Exception {
        return korisnikRepo.findById(idKorisnik).map(korisnik -> {
            korisnik.setImeKorisnik(updatedKorisnik.getImeKorisnik());
            korisnik.setPrezimeKorisnik(updatedKorisnik.getPrezimeKorisnik());
            korisnik.setKorisnickoIme(updatedKorisnik.getKorisnickoIme());
            korisnik.setEmailKorisnik(updatedKorisnik.getEmailKorisnik());
            korisnik.setDostupan(updatedKorisnik.getDostupan());
            korisnik.setBrojTelefona(updatedKorisnik.getBrojTelefona());

            return korisnikRepo.save(korisnik);
        }).orElseThrow(() -> new RuntimeException("Korisnik not found with id " + idKorisnik));

    }

    @Override
    public Korisnik getKorisnikFromJWT(String jwt) {
        String korisnickoIme = jwtProvider.getUsernameFromJwtToken(jwt);
        return korisnikRepo.findByKorisnickoIme(korisnickoIme);
    }

    @Override
    public Korisnik deleteKorisnik(long idKorisnik) {
        Korisnik korisnik = fetch(idKorisnik);
        korisnikRepo.delete(korisnik);
        return korisnik;
    }
}
