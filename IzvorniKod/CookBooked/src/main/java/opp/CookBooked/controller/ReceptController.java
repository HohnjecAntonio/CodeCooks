package opp.CookBooked.controller;

import opp.CookBooked.dto.ReceptDTO;
import opp.CookBooked.dto.ReceptSubmitDTO;
import opp.CookBooked.model.*;
import opp.CookBooked.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/recepti")
public class ReceptController {

    @Autowired
    private ReceptService receptService;

    @Autowired
    private KorisnikService korisnikService;

    @Autowired
    private SpremljeniReceptiService sprRecService;

    @Autowired
    private OznacavanjeRecepataService oznRecService;

    @Autowired
    private KomentariService komentariService;

    @Autowired
    private VrsteKuhinjaReceptaService vrKuhService;

    @GetMapping("")
    public List<ReceptDTO> listRecepts(){
        return receptService.listReceptsForFeed();
    }

    @GetMapping("/{idRecept}")
    public ResponseEntity<ReceptDTO> findReceptById(@PathVariable long idRecept) throws Exception {
        ReceptDTO nRecept = receptService.findReceptDTOById(idRecept);
        return new ResponseEntity<>(nRecept, HttpStatus.OK);
    }

    @GetMapping("/korisnik/{iDKorisnik}")
    public ResponseEntity<List<Recept>> findKorisnikRecepti(@RequestHeader("Authorization") String jwt, @PathVariable long iDKorisnik) throws Exception {
        List<Recept> recepti = receptService.findSpremljeneRecepteByIdKorisnik(iDKorisnik);

        return new ResponseEntity<>(recepti, HttpStatus.OK);
    }

    @PostMapping("/save/korisnik/{iDKorisnik}")
    public ResponseEntity<Recept> createRecept(@RequestHeader("Authorization") String jwt, @RequestBody ReceptSubmitDTO recept, @PathVariable long iDKorisnik) throws Exception {
        Recept noviRecept = receptService.createRecept(recept, iDKorisnik);
        return new ResponseEntity<>(noviRecept, HttpStatus.CREATED);
    }

    @PostMapping("/{idRecept}/addc/korisnik/{iDKorisnik}")
    public ResponseEntity<KomentariRecept> komentiraj(@RequestHeader("Authorization") String jwt, @RequestBody Komentar komentar, @PathVariable long idRecept, @PathVariable long iDKorisnik) throws Exception {
        Korisnik k = korisnikService.findByIdKorisnik(iDKorisnik);
        komentar.setKorisnik(k);
        KomentariRecept kr = komentariService.dodajKomentar(komentar, idRecept);
        return new ResponseEntity<>(kr, HttpStatus.OK);
    }

    @PutMapping("/{idRecept}/editc/korisnik/{iDKorisnik}")
    public ResponseEntity<String> urediKomentar(@RequestHeader("Authorization") String jwt, @RequestBody Komentar komentar, @PathVariable long idRecept, @PathVariable long iDKorisnik) throws Exception {
        String kr = komentariService.urediKomentar(komentar.getIdKomentar(), komentar);
        return new ResponseEntity<>(kr, HttpStatus.OK);
    }

    @DeleteMapping("/{idRecept}/delc/{idKomentar}/korisnik/{iDKorisnik}")
    public ResponseEntity<String> obrisiKomentar(@RequestHeader("Authorization") String jwt, @PathVariable long idKomentar, @PathVariable long idRecept, @PathVariable long iDKorisnik) throws Exception {
        String kr = komentariService.obrisiKomentar(idKomentar, idRecept);
        return new ResponseEntity<>(kr, HttpStatus.OK);
    }

    @PostMapping("/{idRecept}/save/korisnik/{iDKorisnik}")
    public ResponseEntity<SpremljeniRecepti> spremiRecept(@RequestHeader("Authorization") String jwt, @PathVariable long idRecept, @PathVariable long iDKorisnik) throws Exception {
        SpremljeniRecepti sr = sprRecService.spremiRecept(korisnikService.findByIdKorisnik(iDKorisnik), receptService.findReceptById(idRecept));
        return new ResponseEntity<>(sr, HttpStatus.OK);
    }

    @PostMapping("/{idRecept}/like/korisnik/{iDKorisnik}")
    public ResponseEntity<OznacavanjeRecepata> oznaciRecept(@RequestHeader("Authorization") String jwt, @PathVariable long idRecept, @PathVariable long iDKorisnik) throws Exception {
        OznacavanjeRecepata r = oznRecService.oznaciRecept(korisnikService.findByIdKorisnik(iDKorisnik), receptService.findReceptById(idRecept));
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

    @PutMapping("/edit/{idRecept}/korisnik/{idKorisnik}")
    public Recept updateRecept(@RequestHeader("Authorization") String jwt, @PathVariable long idRecept, @RequestBody ReceptSubmitDTO recept) throws Exception {
        return receptService.updateRecept(idRecept, recept);
    }

    @DeleteMapping("/delete/{idRecept}/korisnik/{iDKorisnik}")
    public ResponseEntity<String> deleteRecept(@RequestHeader("Authorization") String jwt, @PathVariable long idRecept, @PathVariable long iDKorisnik) throws Exception {
        String message = receptService.deleteRecept(idRecept, iDKorisnik);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @GetMapping("/vrstekuhinje")
    public ResponseEntity<List<VrstaKuhinje>> dohvatiVrsteKuhinje(@RequestHeader("Authorization") String jwt) {
        List<VrstaKuhinje> r = vrKuhService.findAllVrsteKuhinje();
        return new ResponseEntity<>(r, HttpStatus.OK);
    }
}