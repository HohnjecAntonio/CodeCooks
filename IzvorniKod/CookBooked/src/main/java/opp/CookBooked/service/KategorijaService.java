package opp.CookBooked.service;

import opp.CookBooked.dto.KategorijaDTO;
import opp.CookBooked.model.Kategorija;

import java.util.List;

public interface KategorijaService {
    List<KategorijaDTO> listAll();

    Kategorija findKategorijaById(long idKategorija);

    List<Kategorija> findAllByRecept(long idRecept);
}
