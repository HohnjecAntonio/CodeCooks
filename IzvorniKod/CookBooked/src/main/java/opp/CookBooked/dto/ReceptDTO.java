package opp.CookBooked.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import opp.CookBooked.model.*;

import java.sql.Time;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReceptDTO {

    private Long idRecept;
    private String autor;
    private Long idAutor;
    private String nazivRecept;
    private String priprema;
    private LocalTime vrijemeKuhanja;
    private String oznaka;
    private String slikaRecept;
    private String videoRecept;
    private LocalDate vrijemeObjave;
    private List<VrstaKuhinje> vrsteKuhinje;
    private List<Kategorija> kategorije;
    private List<Sastojak> sastojci;
    private List<Komentar> komentari;
    private List<Korisnik> lajkovi;

    public ReceptDTO(Long idRecept, String nazivRecept) {
        this.idRecept = idRecept;
        this.nazivRecept = nazivRecept;
    }

}