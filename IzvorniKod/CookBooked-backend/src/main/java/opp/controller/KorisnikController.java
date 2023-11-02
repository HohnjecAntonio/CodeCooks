package opp.controller;

import opp.model.Korisnik;
import opp.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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

    @PostMapping("")
    public Korisnik createKorisnik(@RequestBody Korisnik korisnik){
        return korisnikService.createKorisnik(korisnik);
    }
}
