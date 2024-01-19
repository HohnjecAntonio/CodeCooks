package opp.CookBooked.service.implementacija;

import opp.CookBooked.dto.KategorijaDTO;
import opp.CookBooked.dto.ReceptKatDTO;
import opp.CookBooked.model.Kategorija;
import opp.CookBooked.model.ReceptKategorije;
import opp.CookBooked.repository.KategorijaRepository;
import opp.CookBooked.repository.ReceptKategorijeRepository;
import opp.CookBooked.service.KategorijaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class KategorijaServiceJpa implements KategorijaService {

    @Autowired
    private KategorijaRepository kategorijaRepo;

    @Autowired
    private ReceptKategorijeRepository recKatRepo;

    @Override
    public List<KategorijaDTO> listAll() {

        List<Kategorija> kategorije = kategorijaRepo.findAll();
        List<KategorijaDTO> katDTO = new ArrayList<>();

        for (Kategorija kat : kategorije) {

            List<ReceptKategorije> reckat = recKatRepo.findByKategorije(kat.getIdKategorija());
            List<ReceptKatDTO> r = new ArrayList<>();

            for (ReceptKategorije rk : reckat) {
                r.add(new ReceptKatDTO(rk.getRecept().getIdRecept(), rk.getRecept().getNazivRecept(), rk.getRecept().getAutor().getKorisnickoIme()));
            }

            KategorijaDTO k = new KategorijaDTO();
            k.setIdKategorija(kat.getIdKategorija());
            k.setNazivKategorija(kat.getNazivKategorija());
            k.setRecepti(r);

            katDTO.add(k);

        }

        return katDTO;
    }

    @Override
    public Kategorija findKategorijaById(long idKategorija) {
        return kategorijaRepo.findByIdKategorija(idKategorija);
    }

    @Override
    public List<Kategorija> findAllByRecept(long idRecept) {
        return kategorijaRepo.findAllByRecept(idRecept);
    }
}
