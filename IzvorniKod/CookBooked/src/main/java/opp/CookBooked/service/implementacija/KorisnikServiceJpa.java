package opp.CookBooked.service.implementacija;

import jakarta.transaction.Transactional;
import opp.CookBooked.config.jwtProvider;
import opp.CookBooked.dto.FollowDTO;
import opp.CookBooked.dto.ProfilDTO;
import opp.CookBooked.model.Komentar;
import opp.CookBooked.model.Recept;
import opp.CookBooked.repository.ReceptRepository;
import opp.CookBooked.service.KomentariService;
import opp.CookBooked.service.PratiociService;
import opp.CookBooked.service.ReceptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import opp.CookBooked.service.KorisnikService;
import opp.CookBooked.repository.KorisnikRepository;
import opp.CookBooked.model.Korisnik;

import javax.swing.text.DateFormatter;
import java.time.LocalTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
public class KorisnikServiceJpa implements KorisnikService {

    @Autowired
    private KorisnikRepository korisnikRepo;

    @Autowired
    private PratiociService pratiociService;

    @Autowired
    private KomentariService komentariService;

    private ReceptService receptService;

    @Autowired
    public void setReceptService(@Lazy ReceptService receptService) {
        this.receptService = receptService;
    }

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public List<Korisnik> listAll(){
        return korisnikRepo.findAll();
    }

    @Override
    public ProfilDTO fetchProfil(String jwt) throws Exception {
        Korisnik korisnik = getKorisnikFromJWT(jwt);
        List<Recept> mojiRecepti = receptService.findRecepteByAutor(korisnik.getIdKorisnik());
        List<Recept> spremljeniRecepti = receptService.findSpremljeneRecepteByIdKorisnik(korisnik.getIdKorisnik());
        List<FollowDTO> pratim = pratiociService.pronadjiOneKojePratim(korisnik.getIdKorisnik());
        List<FollowDTO> prateMe = pratiociService.pronadjiOneKojiMePrate(korisnik.getIdKorisnik());

        ProfilDTO profil = new ProfilDTO();

        profil.setIdKorisnik(korisnik.getIdKorisnik());
        profil.setKorisnickoIme(korisnik.getKorisnickoIme());
        profil.setImeKorisnik(korisnik.getImeKorisnik());
        profil.setPrezimeKorisnik(korisnik.getPrezimeKorisnik());
        profil.setEmailKorisnik(korisnik.getEmailKorisnik());
        profil.setBrojTelefona(korisnik.getBrojTelefona());
        profil.setDostupanOdDo(korisnik.getDostupanOd() + " - " + korisnik.getDostupanDo());
        profil.setMojiRecepti(mojiRecepti);
        profil.setSpremljeniReceptiKorisnika(spremljeniRecepti);
        profil.setPratiteljiKorisnika(prateMe);
        profil.setPratiociKorisnika(pratim);

        return profil;
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
    public List<FollowDTO> getFollowers(String jwt) throws Exception {
        Korisnik k = getKorisnikFromJWT(jwt);
        return null;
    }

    @Override
    public List<FollowDTO> getFollowings(String jwt) throws Exception {
        return null;
    }

    @Override
    public Korisnik updateKorisnik(long idKorisnik, ProfilDTO updatedKorisnik) throws Exception {

        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

        String formattedDostupanOd = formatLocalTime(updatedKorisnik.getDostupanOd());
        String formattedDostupanDo = formatLocalTime(updatedKorisnik.getDostupanDo());

        return korisnikRepo.findById(idKorisnik).map(korisnik -> {
            korisnik.setImeKorisnik(updatedKorisnik.getImeKorisnik());
            korisnik.setPrezimeKorisnik(updatedKorisnik.getPrezimeKorisnik());
            korisnik.setKorisnickoIme(updatedKorisnik.getKorisnickoIme());
            korisnik.setEmailKorisnik(updatedKorisnik.getEmailKorisnik());
            korisnik.setDostupanOd(formattedDostupanOd);
            korisnik.setDostupanDo(formattedDostupanDo);
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
    public Korisnik deleteKorisnik(long idKorisnik) throws Exception {
        Korisnik korisnik = fetch(idKorisnik);

        pratiociService.obrisiFollow(idKorisnik);

        List<Recept> recepti = receptService.findRecepteByAutor(idKorisnik);

        for (Recept r : recepti) {
            receptService.deleteRecept(r.getIdRecept(), idKorisnik);
        }

        List<Komentar> komentari = komentariService.findAllByIdKorisnik(idKorisnik);
        for (Komentar k : komentari) {
            komentariService.obrisiKomentar(k.getIdKomentar(), idKorisnik);
        }

        korisnikRepo.delete(korisnik);
        return korisnik;
    }

    public String formatLocalTime(LocalTime time) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
        return time.format(formatter);
    }
}