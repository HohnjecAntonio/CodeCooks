package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;

import java.util.List;
import java.util.Set;

public interface KorisnikService {
    List<Korisnik> listAll();

    Korisnik createKorisnik(Korisnik korisnik) throws Exception;

    Korisnik findByKorisnickoIme(String korisnickoIme);

    void addFollower(Korisnik follower, Korisnik following);

    Recept saveRecipeForUser(long korisnikId, long receptId);

    Set<Recept> getSavedRecipesForUser(long korisnikId);

    Set<Korisnik> getUsersWhoSavedRecipe(long receptId);

    Recept likeRecipe(long korisnikId, long receptId);

    Set<Recept> getLikedRecipesForUser(long korisnikId);

    Set<Korisnik> getUsersWhoLikedRecipe(long receptId);

    Korisnik findByIdKorisnik(long iDKorisnik);

    Korisnik fetch(long iDKorisnik) throws Throwable;

    Korisnik deleteKorisnik(long iDKorisnik);
}
