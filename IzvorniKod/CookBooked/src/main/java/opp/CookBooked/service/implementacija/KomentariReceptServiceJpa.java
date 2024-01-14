package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.KomentariRecept;
import opp.CookBooked.model.OznacavanjeRecepata;
import opp.CookBooked.repository.KomentariReceptRepository;
import opp.CookBooked.service.KomentariReceptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class KomentariReceptServiceJpa implements KomentariReceptService {

    @Autowired
    private KomentariReceptRepository komRecRepo;

    @Override
    public String obrisiKomentareReceptByKorisnik(long idRecept) {
        List<KomentariRecept> existingRelationship = komRecRepo
                .findReceptsByKomentar(idRecept);

        komRecRepo.deleteAll(existingRelationship);

        return "Uspješno";
    }

    @Override
    public KomentariRecept findByReceptIdAndAutorIdAAndKomentarId(long idRecept, long idKorisnik, long idKomentar) {
        return komRecRepo.findByReceptIdAndAutorIdAAndKomentarId(idRecept, idKorisnik, idKomentar);
    }

    @Override
    public List<KomentariRecept> findReceptsByKomentar(long idRecept) {
        return komRecRepo.findReceptsByKomentar(idRecept);
    }
}
