package opp.controller;

import opp.model.Korisnik;
import opp.service.EntityMissingException;
import opp.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/korisnici")
public class KorisnikController {

    @Autowired
    private KorisnikService korisnikService;

    @GetMapping("")
    public List<Korisnik> listKorisnike(){
        return korisnikService.listAll();
    }

    @GetMapping("/{korisnickoIme}")
    public Korisnik getKorisnik(@PathVariable("korisnickoIme") String korisnickoIme) {
        return korisnikService.fetch(korisnickoIme);
    }

    @PostMapping("")
    public Korisnik createKorisnik(@RequestBody Korisnik korisnik){
        Korisnik saved = korisnikService.createKorisnik(korisnik);
        return ResponseEntity.created(URI.create("/korisnici/" + saved.getIDKorisnik())).body(saved).getBody();
    }

    @PutMapping("/{korisnickoIme}")
    public ResponseEntity<Korisnik> updateKorisnik(@PathVariable("korisnickoIme") String korisnickoIme, @RequestBody Korisnik updatedKorisnik) {
        Korisnik existingKorisnik = korisnikService.fetch(korisnickoIme);

        existingKorisnik.setLozinkaKorisnik(updatedKorisnik.getLozinkaKorisnik());
        existingKorisnik.setImeKorisnik(updatedKorisnik.getImeKorisnik());
        existingKorisnik.setPrezimeKorisnik(updatedKorisnik.getPrezimeKorisnik());
        existingKorisnik.setBrojTelefona(updatedKorisnik.getBrojTelefona());
        existingKorisnik.setEmailKorisnik(updatedKorisnik.getEmailKorisnik());

        Korisnik updated = korisnikService.updateKorisnik(existingKorisnik);

        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{korisnickoIme}")
    public ResponseEntity<String> deleteKorisnik(@PathVariable("korisnickoIme") String korisnickoIme) {
        try {
            Korisnik deletedKorisnik = korisnikService.deleteKorisnik(korisnickoIme);
            return ResponseEntity.ok("Account with username " + korisnickoIme + " has been successfully deleted.");
        } catch (EntityMissingException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("Account with username " + korisnickoIme + " not found.");
        }
    }
}
