package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;

@Entity
@Table(name = "obavijesti")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class Obavijesti {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(name = "idobavijest")
    private Long idObavijest;

    @Getter
    @Setter
    @Column(name = "idkorisnik")
    private Long idKorisnik;

    @Getter
    @Setter
    @Column(name = "nazivObavijest")
    private String nazivObavijest;

    @Getter
    @Setter
    @Column(name = "sadrzajObavijest")
    private String sadrzajObavijest;

    @Getter
    @Setter
    @Column(name = "datumObavijest")
    private Time datumObavijest;

    @Getter
    @Setter
    @Column(name = "jeProcitano")
    private Integer jeProcitano;

    @ManyToOne
    @JoinColumn(name = "korisnik", referencedColumnName = "idkorisnik")
    private Korisnik korisnik;

    public Obavijesti(Long idKorisnik, String nazivObavijest, String sadrzajObavijest, Time datumObavijest, Integer jeProcitano) {
        this.idKorisnik = idKorisnik;
        this.nazivObavijest = nazivObavijest;
        this.sadrzajObavijest = sadrzajObavijest;
        this.datumObavijest = datumObavijest;
        this.jeProcitano = jeProcitano;
    }

}
