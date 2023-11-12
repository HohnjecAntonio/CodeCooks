package opp.service;

import opp.model.Recept;

import java.util.List;
import java.util.Optional;

public interface ReceptService {

    /**
     * Lists all recipes in the system.
     * @return a list with all recipes
     */
    List<Recept> listAll();

    /**
     * Fetches recipe with given ID.
     * @param id given
     * @return recipe associated with given recipe in the system
     * @throws EntityMissingException if recipe with that id is not found
     * @see ReceptService#findById(long)
     */
    Recept fetch(long id);
    // Note: verb "fetch" in method name is typically used when identified object is expected

    /**
     * Finds user with given ID, if exists.
     * @param id given user ID
     * @return Optional with value of student associated with given ID in the system,
     * or no value if one does not exist
     * @see ReceptService#fetch
     */
    Optional<Recept> findById(long id);

    /**
     * Creates new recipe in the system.
     * @param recept object to create, with korisnickoIme set to null
     * @return created student object in the system with ID set
     * @throws IllegalArgumentException if given user is null, or its ID is NOT null,
     * or its username is null or invalid
     * @throws RequestDeniedException if student with that JMBAG already exists in the system
     * @see Recept
     */
    Recept createRecept(Recept recept);

    /**
     * Updates the user with that same username.
     * @param recept object to update, with ID set
     * @return updated student object in the system
     * @throws IllegalArgumentException if given object is null, has null ID, or has null or invalid JMBAG
     * @throws EntityMissingException if user with given ID is not found
     * @throws RequestDeniedException if another user with some other ID and the same JMBAG already exists
     * @see ReceptService#updateRecept(Recept)
     */
    Recept updateRecept(Recept recept);

    /**
     * Deletes one recipe.
     * @param id ID of user to delete from the system
     * @return deleted data
     * @throws EntityMissingException if recipe with that recipe is not found
     */
    Recept deleteRecept(long id);
}
