package opp.service;

import opp.model.Korisnik;

import java.util.List;
import java.util.Optional;

public interface KorisnikService {

    /**
     * Lists all users in the system.
     * @return a list with all users
     */
    List<Korisnik> listAll();

    /**
     * Fetches user with given korisnickoIme.
     * @param korisnickoIme given user username
     * @return user associated with given username in the system
     * @throws EntityMissingException if user with that username is not found
     * @see KorisnikService#findByKorisnickoIme(String)
     */
    Korisnik fetch(String korisnickoIme);
    // Note: verb "fetch" in method name is typically used when identified object is expected

    /**
     * Creates new user in the system.
     * @param korisnik object to create, with korisnickoIme set to null
     * @return created student object in the system with ID set
     * @throws IllegalArgumentException if given user is null, or its ID is NOT null,
     * or its username is null or invalid
     * @throws RequestDeniedException if student with that JMBAG already exists in the system
     * @see Korisnik
     */
    Korisnik createKorisnik(Korisnik korisnik);

    /**
     * Finds user with given ID, if exists.
     * @param korisnickoIme given user ID
     * @return Optional with value of student associated with given ID in the system,
     * or no value if one does not exist
     * @see KorisnikService#fetch
     */
    Optional<Korisnik> findById(String korisnickoIme);

    /**
     * Finds the user with given username.
     * @param korisnickoIme user ID
     * @return Optional with value of a user associated with given korisnickoIme exists in the system,
     * no value otherwise
     * @throws IllegalArgumentException if given username is null
     */
    Optional<Korisnik> findByKorisnickoIme(String korisnickoIme);

    /**
     * Updates the user with that same username.
     * @param korisnik object to update, with ID set
     * @return updated student object in the system
     * @throws IllegalArgumentException if given object is null, has null ID, or has null or invalid JMBAG
     * @throws EntityMissingException if user with given ID is not found
     * @throws RequestDeniedException if another user with some other ID and the same JMBAG already exists
     * @see KorisnikService#updateKorisnik(Korisnik)
     */
    Korisnik updateKorisnik(Korisnik korisnik);

    /**
     * Deletes one user.
     * @param korisnickoIme ID of user to delete from the system
     * @return deleted data
     * @throws EntityMissingException if user with that korisnickoIme is not found
     */
    Korisnik deleteKorisnik(String korisnickoIme);
}
