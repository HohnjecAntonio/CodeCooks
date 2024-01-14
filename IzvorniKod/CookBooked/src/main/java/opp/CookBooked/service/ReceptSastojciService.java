package opp.CookBooked.service;

import opp.CookBooked.model.*;

import java.util.List;

public interface ReceptSastojciService {

    ReceptSastojci dodajSastojkeReceptu(long idRecept, List<String> sastojci);

    List<Sastojak> findAllByRecept(long idRecept);

}
