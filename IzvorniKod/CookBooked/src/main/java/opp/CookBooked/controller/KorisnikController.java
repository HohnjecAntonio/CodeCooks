package opp.CookBooked.controller;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/korisnici")
public class KorisnikController {

    @Autowired
    private KorisnikService korisnikService;

    @GetMapping("")
    public List<Korisnik> listKorisnik(){
        return korisnikService.listAll();
    }

    @GetMapping("/{id}")
    public Korisnik getKorisnik(@PathVariable("id") long iDKorisnik) throws Throwable {
        return korisnikService.fetch(iDKorisnik);
    }

}