package opp.CookBooked.controller;

import opp.CookBooked.model.Recept;
import opp.CookBooked.service.KorisnikService;
import opp.CookBooked.service.ReceptService;
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

    @GetMapping("")
    public List<Recept> listRecept(){
        return receptService.listAll();
    }

    @GetMapping("/{idRecept}")
    public ResponseEntity<Recept> findReceptByIdHandler(@PathVariable long idRecept) throws Exception {
        Recept nRecept = receptService.findReceptById(idRecept);
        return new ResponseEntity<Recept>(nRecept, HttpStatus.OK);
    }

    @GetMapping("/korisnik/{korisnikId}")
    public ResponseEntity<List<Recept>> findKorisnikRecepti(@PathVariable long korisnikId) throws Exception {
        List<Recept> recepti = receptService.findReceptByKorisnikId(korisnikId);

        return new ResponseEntity<>(recepti, HttpStatus.OK);
    }

    @PostMapping("/korisnik/{korisnikId}")
    public ResponseEntity<Recept> createRecept(@RequestBody Recept recept, @PathVariable long korisnikId) throws Exception {

        Recept noviRecept = receptService.createRecept(recept, korisnikId);

        return new ResponseEntity<Recept>(noviRecept, HttpStatus.CREATED);
    }

    @DeleteMapping("/{receptId}/korisnik/{korisnikId}")
    public ResponseEntity<String> deleteRecept(@PathVariable long receptId, @PathVariable long korisnikId) throws Exception {
        String message = receptService.deleteRecept(receptId, korisnikId);

        return new ResponseEntity<String>(message, HttpStatus.OK);
    }

    @PostMapping("/{receptId}/save/korisnik/{korisnikId}")
    public ResponseEntity<Recept> savedReceptHandler(@PathVariable long receptId, @PathVariable long korisnikId) throws Exception {
        Recept recept = korisnikService.saveRecipeForUser(receptId, korisnikId);
        return new ResponseEntity<Recept>(recept, HttpStatus.OK);
    }

    @PostMapping("/{receptId}/like/korisnik/{korisnikId}")
    public ResponseEntity<Recept> likedReceptHandler(@PathVariable long receptId, @PathVariable long korisnikId) throws Exception {
        Recept recept = korisnikService.likeRecipe(receptId, korisnikId);
        return new ResponseEntity<Recept>(recept, HttpStatus.OK);
    }

}