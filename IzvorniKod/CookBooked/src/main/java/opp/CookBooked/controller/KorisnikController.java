package opp.CookBooked.controller;

import opp.CookBooked.dto.ProfilDTO;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;
import opp.CookBooked.service.KorisnikService;
import opp.CookBooked.service.PratiociService;
import opp.CookBooked.service.ReceptService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin
@RequestMapping("/korisnici")
public class KorisnikController {

    @Autowired
    private KorisnikService korisnikService;

    @Autowired
    private PratiociService pratiociService;

    @Autowired
    private ReceptService receptService;

    @GetMapping("")
    public List<Korisnik> listKorisnik(){
        return korisnikService.listAll();
    }

    @GetMapping("/id/{id}")
    public Korisnik getKorisnikById(@RequestHeader("Authorization") String jwt, @PathVariable("id") long iDKorisnik) throws Throwable {
        return korisnikService.fetch(iDKorisnik);
    }

    @GetMapping("/profile")
    public ProfilDTO getKorisnikByKorisnickoIme(@RequestHeader("Authorization") String jwt) throws Throwable {
        Korisnik korisnik = korisnikService.getKorisnikFromJWT(jwt);
        List<Recept> mojiRecepti = receptService.findRecepteByAutor(korisnik.getIdKorisnik());
        List<Recept> spremljeniRecepti = receptService.findSpremljeneRecepteByIdKorisnik(korisnik.getIdKorisnik());
        List<Korisnik> pratim = pratiociService.pronadjiOneKojePratim(korisnik.getIdKorisnik());
        List<Korisnik> prateMe = pratiociService.pronadjiOneKojiMePrate(korisnik.getIdKorisnik());

        ProfilDTO profil = new ProfilDTO();

        profil.setIdKorisnik(korisnik.getIdKorisnik());
        profil.setKorisnickoIme(korisnik.getKorisnickoIme());
        profil.setImeKorisnik(korisnik.getImeKorisnik());
        profil.setPrezimeKorisnik(korisnik.getPrezimeKorisnik());
        profil.setEmailKorisnik(korisnik.getEmailKorisnik());
        profil.setBrojTelefona(korisnik.getBrojTelefona());
        profil.setDostupan(korisnik.getDostupan());
        profil.setMojiRecepti(mojiRecepti);
        profil.setSpremljeniReceptiKorisnika(spremljeniRecepti);
        profil.setPratiteljiKorisnika(prateMe);
        profil.setPratiociKorisnika(pratim);

        return profil;
    }

    @PutMapping("/update/{korisnickoIme}")
    public Korisnik updateKorisnik(@RequestHeader("Authorization") String jwt, @RequestBody Korisnik korisnik) throws Throwable {
        Korisnik kr = korisnikService.getKorisnikFromJWT(jwt);
        return korisnikService.updateKorisnik(kr.getIdKorisnik(), korisnik);
    }

    @PostMapping("/{followerId}/follow/{followingId}")
    public ResponseEntity<String> followUser(
            @RequestHeader("Authorization") String jwt,
            @PathVariable long followerId,
            @PathVariable long followingId) {

        Korisnik k1 = korisnikService.findByIdKorisnik(followerId);
        Korisnik k2 = korisnikService.findByIdKorisnik(followingId);

        pratiociService.followUser(k1, k2);

        return new ResponseEntity<>("Uspješno", HttpStatus.OK);
    }
}