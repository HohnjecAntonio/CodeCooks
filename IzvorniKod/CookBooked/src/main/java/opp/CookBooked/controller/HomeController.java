package opp.CookBooked.controller;

import opp.CookBooked.model.Kategorija;
import opp.CookBooked.service.KategorijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin
public class HomeController {

    @Autowired
    private KategorijaService kategorijaService;

    @GetMapping("")
    public List<Kategorija> listKategorije(){
        return kategorijaService.listAll();
    }

}
