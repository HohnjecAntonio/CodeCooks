package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Kategorija;
import opp.CookBooked.model.Recept;
import opp.CookBooked.model.ReceptKategorije;
import opp.CookBooked.model.SpremljeniRecepti;
import opp.CookBooked.repository.KategorijaRepository;
import opp.CookBooked.repository.ReceptKategorijeRepository;
import opp.CookBooked.repository.ReceptRepository;
import opp.CookBooked.service.KategorijaService;
import opp.CookBooked.service.ReceptKategorijeService;
import opp.CookBooked.service.ReceptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class ReceptKategorijeServiceJpa implements ReceptKategorijeService {

    @Autowired
    private ReceptKategorijeRepository reKatRepo;

    @Autowired
    private ReceptRepository receptRepo;

    @Autowired
    private KategorijaRepository katRepo;


    @Override
    public ReceptKategorije dodajKategorijuReceptu(long idRecept, long idKategorija) throws Exception {

        ReceptKategorije existingRelationship = reKatRepo
                .findByReceptAndKategorija(idRecept, idKategorija);


        Recept recept = receptRepo.findByIdRecept(idRecept);
        Kategorija kategorija = katRepo.findByIdKategorija(idKategorija);
        ReceptKategorije spremRec = new ReceptKategorije(recept, kategorija);
        return reKatRepo.save(spremRec);

    }

    @Override
    public String obrisiKategorijuRecepta(long idRecept) {

        try {
            ReceptKategorije rk = reKatRepo.findByReceptId(idRecept);
            if (rk != null) reKatRepo.delete(rk);
            return "Uspješno brisanje.";
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<ReceptKategorije> findByKategorije(long idKategorija) {
        return reKatRepo.findByKategorije(idKategorija);
    }
}
