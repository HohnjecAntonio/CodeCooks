package opp.CookBooked.service;

import opp.CookBooked.model.*;

import java.util.List;

public interface ReceptSastojciService {

    ReceptSastojci dodajSastojakReceptu(Recept recept, Sastojak sastojak);

    List<Sastojak> findAllByRecept(long idRecept);

}
