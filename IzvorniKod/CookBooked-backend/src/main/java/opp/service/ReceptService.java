package opp.service;

import opp.model.Korisnik;

import java.util.List;

public interface ReceptService {
    List<Recept> listAll();

    Recept fetch(long iDRecept);

    Recept createRecept(Recept recept);

    Optional<Recept> findById(long iDRecept);

    Recept deleteRecept(long iDRecept);
}
