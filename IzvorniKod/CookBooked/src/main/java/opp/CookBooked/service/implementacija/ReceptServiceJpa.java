package opp.CookBooked.service.implementacija;

import jakarta.persistence.EntityNotFoundException;
import opp.CookBooked.dto.ReceptDTO;
import opp.CookBooked.model.*;
import opp.CookBooked.repository.*;
import opp.CookBooked.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;
import java.util.Set;

@Service
public class ReceptServiceJpa implements ReceptService {

    @Autowired
    private ReceptRepository receptRepo;

    @Autowired
    private KorisnikService korisnikService;

    @Autowired
    private ReceptSastojciService recSasService;

    @Autowired
    private KategorijaService katService;

    @Autowired
    private VrsteKuhinjaReceptaService vrKuhService;

    @Autowired
    private KomentariService komentariService;

    @Autowired
    private OznacavanjeRecepataService oznRecService;

    @Autowired
    private SpremljeniReceptiService spremRecService;

    @Autowired
    private KomentariReceptRepository komRecRepo;


    @Override
    public List<Recept> listAll() {
        return receptRepo.findAll();
    }

    @Override
    public List<ReceptDTO> listReceptsForFeed() {
        List<ReceptDTO> receptiZaFeed = new ArrayList<>();
        List<Recept> recepti = listAll();

        for (Recept r : recepti) {

            List<Sastojak> sastojci = recSasService.findAllByRecept(r.getIdRecept());
            List<Kategorija> kategorije = katService.findAllByRecept(r.getIdRecept());
            List<VrstaKuhinje> vrKuhinje = vrKuhService.findAllByRecept(r.getIdRecept());
            List<Korisnik> lajkovi = oznRecService.findAllByRecept(r.getIdRecept());
            List<Komentar> komentari = komentariService.findAllByRecept(r.getIdRecept());

            ReceptDTO rdto = new ReceptDTO();

            rdto.setIdRecept(r.getIdRecept());
            rdto.setNazivRecept(r.getNazivRecept());
            rdto.setAutor(r.getAutor().getKorisnickoIme());
            rdto.setSlikaRecept(r.getSlikaRecept());
            rdto.setVideoRecept(r.getVideoRecept());
            rdto.setVrijemeKuhanja(r.getVrijemeKuhanja());
            rdto.setOznaka(r.getOznaka());
            rdto.setVrijemeObjave(r.getVrijemeObjave());
            rdto.setSastojci(sastojci);
            rdto.setKategorije(kategorije);
            rdto.setVrsteKuhinje(vrKuhinje);
            rdto.setLajkovi(lajkovi);
            rdto.setKomentari(komentari);

            receptiZaFeed.add(rdto);
        }

        return receptiZaFeed;
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
        Korisnik korisnik = korisnikService.findByIdKorisnik(korisnikId);

        if (recept.getAutor().getIdKorisnik() != korisnikId) {
            throw new Exception("Ne možete obrisati ovaj recept jer niste njegov autor!");
        }

        spremRecService.obrisiRecept(korisnik, recept);
        oznRecService.obrisiOznaceReceptByIdKorisnik(korisnikId, idRecept);

        List<KomentariRecept> komentari = komRecRepo.findReceptsByKomentar(idRecept);
        for (KomentariRecept kr : komentari) {
            Komentar kom = kr.getKomentar();
            komRecRepo.delete(kr);
            komentariService.obrisiKomentar(kom.getIdKomentar(), idRecept);
        }

        recept.setAutor(null);
        receptRepo.delete(recept);
        return "Recept s ID: " + recept.getIdRecept() + " od korisnika s ID: " + korisnikId + " uspješno obrisan.";
    }
}
