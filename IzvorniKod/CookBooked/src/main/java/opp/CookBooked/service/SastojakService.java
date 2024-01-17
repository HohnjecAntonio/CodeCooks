package opp.CookBooked.service;

import opp.CookBooked.model.Sastojak;

import java.util.List;

public interface SastojakService {

    String dodajSastojke(List<String> sastojci);

    Sastojak findById(long idSastojak);

    Sastojak findByNaziv(String naziv);

}
