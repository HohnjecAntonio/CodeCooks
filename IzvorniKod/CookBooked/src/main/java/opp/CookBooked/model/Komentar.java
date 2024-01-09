package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "komentar")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class Komentar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idkomentar")
    @Getter
    @Setter
    private Long idKomentar;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "idrecept")
    private ObjavaRecepta objavaRecepta;

    @Getter
    @Setter
    @Column(name = "idobjava")
    private Long idObjava;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "korisnik", referencedColumnName = "idkorisnik")
    private Korisnik korisnik;

    @Getter
    @Setter
    private Long idKorisnik;

    @Getter
    @Setter
    @Column(name = "naslovKomentar")
    private String naslovKomentar;

    @Getter
    @Setter
    @Column(name = "opisKomentar")
    private String opisKomentar;

    @Getter
    @Setter
    @Column(name = "datumKomentar")
    private Date datumKomentar;

    public Komentar(ObjavaRecepta objavaRecepta, Long idObjava, Long idKorisnik, String naslovKomentar, String opisKomentar, Date datumKomentar) {
        this.objavaRecepta = objavaRecepta;
        this.idObjava = idObjava;
        this.idKorisnik = idKorisnik;
        this.naslovKomentar = naslovKomentar;
        this.opisKomentar = opisKomentar;
        this.datumKomentar = datumKomentar;
    }

}
