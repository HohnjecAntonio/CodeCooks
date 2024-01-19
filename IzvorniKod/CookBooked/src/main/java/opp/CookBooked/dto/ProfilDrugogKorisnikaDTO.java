package opp.CookBooked.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import opp.CookBooked.model.Recept;

import java.time.LocalTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ProfilDrugogKorisnikaDTO {

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
    private List<ReceptDTO> mojiRecepti;

    @Setter
    private List<FollowDTO> pratiteljiKorisnika;

    @Setter
    private List<FollowDTO> pratiociKorisnika;
}
