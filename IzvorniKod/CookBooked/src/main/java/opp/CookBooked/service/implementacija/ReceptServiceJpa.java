package opp.CookBooked.service.implementacija;

import opp.CookBooked.dto.ReceptDTO;
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

    @Override
    public List<Recept> listAll() {
        return receptRepo.findAll();
    }

    @Override
    public Recept findReceptById(long idRecept) throws Exception {
        return receptRepo.findByIdRecept(idRecept);
    }

    @Override
    public List<Recept> findSpremljeneRecepteByIdKorisnik(long idKorisnik) throws Exception {
        return receptRepo.findSpremljeniReceptiByIdKorisnik(idKorisnik);
    }

    @Override
    public List<Recept> findRecepteByAutor(long idKorisnik) throws Exception {
        return receptRepo.findRecepteByAutor(idKorisnik);
    }

    @Override
    public Recept createRecept(Recept recept, long iDKorisnik) throws Exception {

        Korisnik k = korisnikService.findByIdKorisnik(iDKorisnik);

        Recept noviRecept = new Recept();

        noviRecept.setNazivRecept(recept.getNazivRecept());
        noviRecept.setAutor(k);
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
    public Recept updateRecept(long idRecept, Recept updatedRecept) throws Exception {
        return receptRepo.findById(idRecept).map(recept -> {

            recept.setNazivRecept(updatedRecept.getNazivRecept());
            recept.setPriprema(updatedRecept.getPriprema());
            recept.setAutor(updatedRecept.getAutor());
            recept.setOznaka(updatedRecept.getOznaka());
            recept.setSlikaRecept(updatedRecept.getSlikaRecept());
            recept.setVideoRecept(updatedRecept.getVideoRecept());
            recept.setVrijemeObjave(LocalDate.now());
            recept.setVrijemeKuhanja(updatedRecept.getVrijemeKuhanja());

            return receptRepo.save(recept);
        }).orElseThrow(() -> new RuntimeException("Recept not found with id " + idRecept));

    }

    @Override
    public String deleteRecept(long idRecept, long korisnikId) throws Exception {

        Recept recept = findReceptById(idRecept);

        if (recept.getAutor().getIdKorisnik() != korisnikId) {
            throw new Exception("Ne možete obrisati ovaj recept jer niste njegov autor!");
        }

        receptRepo.delete(recept);
        return "Recept s ID: " + recept.getIdRecept() + " od korisnika s ID: " + korisnikId + " uspješno obrisan.";
    }
}
