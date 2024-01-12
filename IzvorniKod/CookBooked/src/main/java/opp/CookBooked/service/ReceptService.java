package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReceptService {

    List<Recept> listAll();

    Recept findReceptById(long idRecept) throws Exception;

    List<Recept> findSpremljeneRecepteByIdKorisnik(long iDKorisnik) throws Exception;

    Recept createRecept(Recept recept, long iDKorisnik) throws Exception;

    Recept updateRecept(long idRecept, Recept updatedRecept) throws Exception;

    String deleteRecept(long idRecept, long korisnikId) throws Exception;
}
