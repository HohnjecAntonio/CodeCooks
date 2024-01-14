package opp.CookBooked.service;

import opp.CookBooked.model.Kategorija;
import opp.CookBooked.model.Recept;
import opp.CookBooked.model.ReceptKategorije;

import java.util.Set;

public interface ReceptKategorijeService {

    ReceptKategorije dodajKategorijuReceptu(long idRecept, long idKategorija) throws Exception;

}
