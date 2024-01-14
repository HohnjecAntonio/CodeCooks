package opp.CookBooked.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;

import java.sql.Time;
import java.time.LocalTime;
import java.util.List;
import java.util.Set;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProfilDTO {

    @Setter
    private Long idKorisnik;

    @Setter
    private String imeKorisnik;

    @Setter
    private String prezimeKorisnik;

    @Setter
    private String korisnickoIme;

    @Setter
    private String emailKorisnik;

    @Setter
    private String brojTelefona;

    @Setter
    private LocalTime dostupanOd;

    @Setter
    private LocalTime dostupanDo;

    @Setter
    private String dostupanOdDo;

    @Setter
    private List<Recept> mojiRecepti;

    @Setter
    private List<Recept> spremljeniReceptiKorisnika;

    @Setter
    private List<FollowDTO> pratiteljiKorisnika;

    @Setter
    private List<FollowDTO> pratiociKorisnika;

}