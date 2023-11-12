package opp.controller;

import opp.model.Recept;
import opp.service.ReceptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/recept")
public class ReceptController {

    @Autowired
    private ReceptService receptService;

    @GetMapping("")
    public List<Recept> listRecipes(){
        return receptService.listAll();
    }

    @GetMapping("/{id}")
    public Recept getRecipe(@PathVariable("id") long id) {
        return receptService.fetch(id);
    }

    @PostMapping("")
    public ResponseEntity<Recept> createRecipe(@RequestBody Recept recept){
        Recept saved = receptService.createRecept(recept);
        return ResponseEntity.created(URI.create("/recept/" + saved.getIDRecept())).body(saved);
    }
}

