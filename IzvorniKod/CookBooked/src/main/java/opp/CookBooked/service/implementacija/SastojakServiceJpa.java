package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.Sastojak;
import opp.CookBooked.repository.SastojakRepository;
import opp.CookBooked.service.SastojakService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SastojakServiceJpa implements SastojakService {

    @Autowired
    private SastojakRepository sastojakRepo;

    @Override
    public String dodajSastojke(List<String> sastojci) {

        for (String sas : sastojci) {
            if (!sas.isEmpty()) {
                Sastojak sastojak = findByNaziv(sas.trim().toLowerCase());
                if (sastojak == null) sastojakRepo.save(new Sastojak(sas.trim().toLowerCase()));
            }
        }

        return "Uspješno spremanje sastojaka";
    }

    @Override
    public Sastojak findById(long idSastojak) {
        return sastojakRepo.findByIdSastojak(idSastojak);
    }

    @Override
    public Sastojak findByNaziv(String naziv) {
        return sastojakRepo.findByNazivSastojak(naziv);
    }
}
