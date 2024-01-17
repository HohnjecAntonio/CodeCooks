package opp.CookBooked.dto;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;
import java.time.LocalTime;

@Getter @Setter
public class ReceptSubmitDTO {

    private Long idRecept;
    private String nazivRecept;
    private Long idKorisnik;
    private Long idKategorija;
    private Long idVrstaKuhinje;
    private String sastojci;
    private String priprema;
    private LocalTime vrijemeKuhanja;
    private String oznaka;
    private String slikaRecept;
    private String videoRecept;
    private LocalDate vrijemeObjave;

}
