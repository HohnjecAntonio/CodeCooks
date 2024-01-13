package opp.CookBooked.service.implementacija;

import opp.CookBooked.model.*;
import opp.CookBooked.repository.KomentariReceptRepository;
import opp.CookBooked.repository.KomentariRepository;
import opp.CookBooked.repository.KorisnikRepository;
import opp.CookBooked.repository.ReceptRepository;
import opp.CookBooked.service.KomentariService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cglib.core.Local;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class KomentariServiceJpa implements KomentariService {

    @Autowired
    private KomentariRepository komentariRepo;

    @Autowired
    private KomentariReceptRepository komRecRepo;

    @Autowired
    private ReceptRepository receptRepo;

    @Autowired
    private KorisnikRepository korisnikRepo;

    @Override
    public KomentariRecept dodajKomentar(Komentar komentar, long idRecept) {

        Recept recept = receptRepo.findByIdRecept(idRecept);

        KomentariRecept kr = new KomentariRecept();
        komentar.setDatumKomentar(LocalDate.now());
        kr.setKomentar(komentar);

        komentariRepo.save(komentar);

        kr.setRecept(recept);

        komRecRepo.save(kr);
        return kr;
    }

    @Override
    public String urediKomentar(long idKomentar, Komentar updatedKomentar) {

        Komentar kom = findById(idKomentar);

        Korisnik korisnik = korisnikRepo.findByIdKorisnik(kom.getKorisnik().getIdKorisnik());
        kom.setOpisKomentar(updatedKomentar.getOpisKomentar());
        kom.setDatumKomentar(LocalDate.now());

        komentariRepo.save(kom);

        return "Uspješno ažuriranje komentara korisnika " + korisnik.getKorisnickoIme();
    }

    @Override
    public String obrisiKomentar(long idKomentar, long idRecept) {
        Komentar kom = findById(idKomentar);
        Recept recept = receptRepo.findByIdRecept(idRecept);

        KomentariRecept existingRelationship = komRecRepo
                .findByIdReceptAndIdKorisnik(idRecept, recept.getAutor().getIdKorisnik());

        if (existingRelationship != null) {
            komRecRepo.delete(existingRelationship);
        }

        komentariRepo.delete(kom);


        return "Uspješno brisanje komentara korisnika";
    }

    @Override
    public List<Komentar> findAllByRecept(long idRecept) {
        return komentariRepo.findAllByRecept(idRecept);
    }

    @Override
    public Komentar findById(long idKomentar) {
        return komentariRepo.findByIdKomentar(idKomentar);
    }
}
