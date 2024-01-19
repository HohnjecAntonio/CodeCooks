package opp.CookBooked.service.implementacija;

import jakarta.transaction.Transactional;
import opp.CookBooked.config.jwtProvider;
import opp.CookBooked.dto.FollowDTO;
import opp.CookBooked.dto.ProfilDTO;
import opp.CookBooked.dto.ProfilDrugogKorisnikaDTO;
import opp.CookBooked.dto.ReceptDTO;
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
        try {
            Korisnik korisnik = getKorisnikFromJWT(jwt);

            if (korisnik != null) {

                List<ReceptDTO> mojiRecepti = receptService.findRecepteByAutorDTO(korisnik.getIdKorisnik());
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
                profil.setRazinaOvlasti(korisnik.getRazinaOvlasti());
                profil.setDostupanOdDo(korisnik.getDostupanOd() + " - " + korisnik.getDostupanDo());
                profil.setMojiRecepti(mojiRecepti);
                profil.setSpremljeniReceptiKorisnika(spremljeniRecepti);
                profil.setPratiteljiKorisnika(prateMe);
                profil.setPratiociKorisnika(pratim);

                return profil;
            } else return null;
        } catch (Exception e) {
            throw new Exception("Nije moguće dohvatiti profil!");
        }
    }

    @Override
    public Korisnik createKorisnik(Korisnik korisnik) throws Exception {
        try {

            Korisnik noviKorisnik = new Korisnik();

            noviKorisnik.setImeKorisnik(korisnik.getImeKorisnik());
            noviKorisnik.setPrezimeKorisnik(korisnik.getPrezimeKorisnik());
            noviKorisnik.setEmailKorisnik(korisnik.getEmailKorisnik());
            noviKorisnik.setKorisnickoIme(korisnik.getKorisnickoIme());
            noviKorisnik.setLozinkaKorisnik(passwordEncoder.encode(korisnik.getLozinkaKorisnik()));
            noviKorisnik.setRazinaOvlasti("K");

            return korisnikRepo.save(noviKorisnik);
        } catch (Exception e) {
            throw new Exception("Nije uspjelo spremanje korisnika!");
        }
    }

    @Override
    public Korisnik findByKorisnickoIme(String korisnickoIme) {
        try {
            Assert.notNull(korisnickoIme, "Polje korisnickoIme ne smije biti prazno!");
            return korisnikRepo.findByKorisnickoIme(korisnickoIme);
        } catch (Exception e) {
            throw new EntityMissingException(Korisnik.class, korisnickoIme);
        }
    }

    @Override
    public Korisnik findByIdKorisnik(long idKorisnik) {
        try {
            return korisnikRepo.findByIdKorisnik(idKorisnik);
        } catch (Exception e) {
            throw new EntityMissingException(Korisnik.class, idKorisnik);
        }
    }

    @Override
    public Korisnik getRoleByIdKorisnik(long idKorisnik){
        try {
            return korisnikRepo.getRoleByIdKorisnik(idKorisnik);
        } catch (Exception e) {
            throw new EntityMissingException(Korisnik.class, idKorisnik);
        }
    }

    @Override
    public ProfilDrugogKorisnikaDTO fetchZaProfil(String korisnickoIme) {
        try {
            Korisnik korisnik = findByKorisnickoIme(korisnickoIme);

            if (korisnik != null) {

                List<ReceptDTO> mojiRecepti = receptService.findRecepteByAutorDTO(korisnik.getIdKorisnik());
                List<FollowDTO> pratim = pratiociService.pronadjiOneKojePratim(korisnik.getIdKorisnik());
                List<FollowDTO> prateMe = pratiociService.pronadjiOneKojiMePrate(korisnik.getIdKorisnik());


                ProfilDrugogKorisnikaDTO profil = new ProfilDrugogKorisnikaDTO();

                profil.setIdKorisnik(korisnik.getIdKorisnik());
                profil.setKorisnickoIme(korisnik.getKorisnickoIme());
                profil.setImeKorisnik(korisnik.getImeKorisnik());
                profil.setPrezimeKorisnik(korisnik.getPrezimeKorisnik());
                profil.setEmailKorisnik(korisnik.getEmailKorisnik());
                profil.setBrojTelefona(korisnik.getBrojTelefona());
                profil.setDostupanOdDo(korisnik.getDostupanOd() + " - " + korisnik.getDostupanDo());
                profil.setMojiRecepti(mojiRecepti);
                profil.setPratiteljiKorisnika(prateMe);
                profil.setPratiociKorisnika(pratim);

                return profil;
            } else return null;
        } catch (Exception e) {
            throw new EntityMissingException(Korisnik.class, korisnickoIme);
        }
    }

    @Override
    public Korisnik fetch(long idKorisnik) throws Exception {
        try {
            return korisnikRepo.findByIdKorisnik(idKorisnik);
        } catch (Exception e) {
            throw new EntityMissingException(Korisnik.class, idKorisnik);
        }
    }

    @Override
    public Korisnik updateKorisnik(long idKorisnik, ProfilDTO updatedKorisnik) throws Exception {
        try {
            return korisnikRepo.findById(idKorisnik).map(korisnik -> {
                korisnik.setImeKorisnik(updatedKorisnik.getImeKorisnik());
                korisnik.setPrezimeKorisnik(updatedKorisnik.getPrezimeKorisnik());
                korisnik.setKorisnickoIme(updatedKorisnik.getKorisnickoIme());
                korisnik.setEmailKorisnik(updatedKorisnik.getEmailKorisnik());
                korisnik.setDostupanOd(formatLocalTime(updatedKorisnik.getDostupanOd()));
                korisnik.setDostupanDo(formatLocalTime(updatedKorisnik.getDostupanDo()));
                korisnik.setBrojTelefona(updatedKorisnik.getBrojTelefona());

                return korisnikRepo.save(korisnik);
            }).orElseThrow(() -> new RuntimeException("Korisnik not found with id " + idKorisnik));
        } catch (Exception e) {
            throw new Exception("Nije uspjelo ažuriranje podataka!");
        }
    }

    @Override
    public Korisnik getKorisnikFromJWT(String jwt) {
        try {
            String korisnickoIme = jwtProvider.getUsernameFromJwtToken(jwt);

            if (!korisnickoIme.isEmpty()) return korisnikRepo.findByKorisnickoIme(korisnickoIme);
            else return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Korisnik deleteKorisnik(long idKorisnik) {
        try {
            Korisnik korisnik = fetch(idKorisnik);

            if (korisnik != null) {
                pratiociService.obrisiFollow(idKorisnik);

                List<Recept> recepti = receptService.findRecepteByAutor(idKorisnik); // pronalazenje svih recepata korisnika i brisanje istih

                for (Recept r : recepti) {
                    receptService.deleteRecept(r.getIdRecept(), idKorisnik);
                }

                List<Komentar> komentari = komentariService.findAllByIdKorisnik(idKorisnik); // pronalazenje svih komentara i brisanje istih
                for (Komentar k : komentari) {
                    komentariService.obrisiKomentar(k.getIdKomentar(), idKorisnik);
                }

                korisnikRepo.delete(korisnik);
                return korisnik;
            } else return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String formatLocalTime(LocalTime time) {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");
            return time.format(formatter);
    }
}