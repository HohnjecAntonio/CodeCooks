package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;
import opp.CookBooked.repository.KorisnikRepository;
import opp.CookBooked.repository.ReceptRepository;
import opp.CookBooked.service.KorisnikService;
import opp.CookBooked.service.ReceptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReceptServiceJpa implements ReceptService {

    @Autowired
    private ReceptRepository receptRepo;

    @Autowired
    private KorisnikService korisnikService;

    @Autowired
    private KorisnikRepository korisnikRepo;


    @Override
    public List<Recept> listAll() {
        return receptRepo.findAll();
    }

    @Override
    public Recept findReceptById(long idRecept) throws Exception {
        return receptRepo.findByIdRecept(idRecept);
    }

    @Override
    public List<Recept> findReceptByKorisnikId(long korisnikId) throws Exception {
        return receptRepo.findReceptByKorisnikId(korisnikId);
    }

    @Override
    public Recept createRecept(Recept recept, long iDKorisnik) throws Exception {

        Korisnik korisnik = korisnikService.findByIdKorisnik(iDKorisnik);

        Recept noviRecept = new Recept();

        noviRecept.setNazivRecept(recept.getNazivRecept());
        noviRecept.setKorisnik(korisnik);
        noviRecept.setPriprema(recept.getPriprema());
        noviRecept.setOznaka(recept.getOznaka());
        noviRecept.setVrijemeKuhanja(recept.getVrijemeKuhanja());
        noviRecept.setSlikaRecept(recept.getSlikaRecept());
        noviRecept.setVideoRecept(recept.getVideoRecept());
        noviRecept.setVrijemeObjave(LocalDate.now());

        receptRepo.save(noviRecept);

        return noviRecept;
    }

    @Override
    public Recept updateRecept(Recept recept) throws Exception {
        return null;
    }

    @Override
    public String deleteRecept(long idRecept, long korisnikId) throws Exception {

        Recept recept = findReceptById(idRecept);
        Korisnik korisnik = korisnikService.findByIdKorisnik(korisnikId);

        if (recept.getKorisnik().getIdKorisnik() != korisnikId) {
            throw new Exception("Ne možete obrisati ovaj recept!");
        }

        receptRepo.delete(recept);
        return "Recept s ID: " + recept.getIdRecept() + " od korisnika s ID: " + korisnikId + " uspješno obrisan.";
    }
}
