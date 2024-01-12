package opp.CookBooked.controller;

import opp.CookBooked.model.OznacavanjeRecepata;
import opp.CookBooked.model.Recept;
import opp.CookBooked.model.SpremljeniRecepti;
import opp.CookBooked.service.KorisnikService;
import opp.CookBooked.service.OznacavanjeRecepataService;
import opp.CookBooked.service.ReceptService;
import opp.CookBooked.service.SpremljeniReceptiService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
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

    @GetMapping("")
    public List<Recept> listRecept(){
        return receptService.listAll();
    }

    @GetMapping("/{idRecept}")
    public ResponseEntity<Recept> findReceptById(@PathVariable long idRecept) throws Exception {
        Recept nRecept = receptService.findReceptById(idRecept);
        return new ResponseEntity<>(nRecept, HttpStatus.OK);
    }

    @GetMapping("/korisnik/{iDKorisnik}")
    public ResponseEntity<List<Recept>> findKorisnikRecepti(@PathVariable long iDKorisnik) throws Exception {
        List<Recept> recepti = receptService.findSpremljeneRecepteByIdKorisnik(iDKorisnik);

        return new ResponseEntity<>(recepti, HttpStatus.OK);
    }

    @PostMapping("/save/korisnik/{iDKorisnik}")
    public ResponseEntity<Recept> createRecept(@RequestBody Recept recept, @PathVariable long iDKorisnik) throws Exception {
        Recept noviRecept = receptService.createRecept(recept, iDKorisnik);
        return new ResponseEntity<>(noviRecept, HttpStatus.CREATED);
    }

    @DeleteMapping("/delete/{receptId}/korisnik/{iDKorisnik}")
    public ResponseEntity<String> deleteRecept(@PathVariable long receptId, @PathVariable long iDKorisnik) throws Exception {
        String message = receptService.deleteRecept(receptId, iDKorisnik);
        return new ResponseEntity<>(message, HttpStatus.OK);
    }

    @PostMapping("/{receptId}/save/korisnik/{iDKorisnik}")
    public ResponseEntity<SpremljeniRecepti> spremiRecept(@PathVariable long receptId, @PathVariable long iDKorisnik) throws Exception {
        SpremljeniRecepti sr = sprRecService.spremiRecept(korisnikService.findByIdKorisnik(iDKorisnik), receptService.findReceptById(receptId));
        return new ResponseEntity<>(sr, HttpStatus.OK);
    }

    @PostMapping("/{receptId}/like/korisnik/{iDKorisnik}")
    public ResponseEntity<OznacavanjeRecepata> oznaciRecept(@PathVariable long receptId, @PathVariable long iDKorisnik) throws Exception {
        OznacavanjeRecepata r = oznRecService.oznaciRecept(korisnikService.findByIdKorisnik(iDKorisnik), receptService.findReceptById(receptId));
        return new ResponseEntity<>(r, HttpStatus.OK);
    }

}