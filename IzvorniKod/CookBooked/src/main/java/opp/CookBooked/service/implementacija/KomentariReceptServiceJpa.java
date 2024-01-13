package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.KomentariRecept;
import opp.CookBooked.repository.KomentariReceptRepository;
import opp.CookBooked.service.KomentariReceptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class KomentariReceptServiceJpa implements KomentariReceptService {

    @Autowired
    private KomentariReceptRepository komRecRepo;

    @Override
    public KomentariRecept findByReceptIdAndAutorIdAAndKomentarId(long idRecept, long idKorisnik, long idKomentar) {
        return komRecRepo.findByReceptIdAndAutorIdAAndKomentarId(idRecept, idKorisnik, idKomentar);
    }
}
