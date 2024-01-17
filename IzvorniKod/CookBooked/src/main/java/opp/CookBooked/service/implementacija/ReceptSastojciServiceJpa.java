package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.*;
import opp.CookBooked.repository.ReceptRepository;
import opp.CookBooked.repository.ReceptSastojciRepository;
import opp.CookBooked.repository.SastojakRepository;
import opp.CookBooked.service.ReceptSastojciService;
import opp.CookBooked.service.SastojakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReceptSastojciServiceJpa implements ReceptSastojciService {

    @Autowired
    private ReceptSastojciRepository recSasRepo;

    @Autowired
    private ReceptRepository receptRepo;

    @Autowired
    private SastojakService sastojakService;

    @Override
    public ReceptSastojci dodajSastojkeReceptu(long idRecept, List<String> sastojci) {

        sastojakService.dodajSastojke(sastojci);

        Recept recept = receptRepo.findByIdRecept(idRecept);

        for (String s : sastojci) {
            Sastojak sastojak = sastojakService.findByNaziv(s.trim());
            ReceptSastojci spremRec = new ReceptSastojci(recept, sastojak);
            recSasRepo.save(spremRec);
        }

        return null;
    }

    @Override
    public String obrisiSastojkeRecepta(long idRecept) {

        try {
            List<ReceptSastojci> sastojci = recSasRepo.findAllByReceptId(idRecept);
            recSasRepo.deleteAll(sastojci);
            return "Uspješno brisanje";

        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }


    @Override
    public List<Sastojak> findAllByRecept(long idRecept) {
        return recSasRepo.findAllByRecept(idRecept);
    }
}
