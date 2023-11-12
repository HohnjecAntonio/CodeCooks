package opp.controller;

import opp.model.Korisnik;
import opp.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
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
}
