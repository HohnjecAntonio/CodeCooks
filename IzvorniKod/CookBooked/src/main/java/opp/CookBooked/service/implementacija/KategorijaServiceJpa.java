package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Kategorija;
import opp.CookBooked.repository.KategorijaRepository;
import opp.CookBooked.service.KategorijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KategorijaServiceJpa implements KategorijaService {

    @Autowired
    private KategorijaRepository kategorijaRepo;

    @Override
    public List<Kategorija> listAll() {
        return kategorijaRepo.findAll();
    }
}
