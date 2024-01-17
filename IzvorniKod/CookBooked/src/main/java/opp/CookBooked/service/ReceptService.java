package opp.CookBooked.service;

import opp.CookBooked.dto.ReceptDTO;
import opp.CookBooked.dto.ReceptSubmitDTO;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ReceptService {

    List<Recept> listAll();

    public List<ReceptDTO> listReceptsForFeed();

    Recept findReceptById(long idRecept) throws Exception;

    ReceptDTO findReceptDTOById(long idRecept) throws Exception;

    List<Recept> findSpremljeneRecepteByIdKorisnik(long iDKorisnik) throws Exception;

    List<Recept> findRecepteByAutor(long idKorisnik) throws Exception;

    List<ReceptDTO> findRecepteByAutorDTO(long idKorisnik) throws Exception;

    Recept createRecept(ReceptSubmitDTO recept, long iDKorisnik) throws Exception;

    Recept updateRecept(long idRecept, ReceptSubmitDTO updatedRecept) throws Exception;

    String deleteRecept(long idRecept, long korisnikId) throws Exception;
}
