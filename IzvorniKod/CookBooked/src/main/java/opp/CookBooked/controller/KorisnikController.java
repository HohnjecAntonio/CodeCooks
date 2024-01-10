package opp.CookBooked.controller;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.service.KorisnikService;
import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @PostMapping("/{followerId}/follow/{followingId}")
    public ResponseEntity<String> followUser(
            @PathVariable long followerId,
            @PathVariable long followingId) {

        Korisnik k1 = korisnikService.findByIdKorisnik(followerId);
        Korisnik k2 = korisnikService.findByIdKorisnik(followingId);

        korisnikService.addFollower(k1, k2);

        return new ResponseEntity<>("Uspješno", HttpStatus.OK);
    }
}