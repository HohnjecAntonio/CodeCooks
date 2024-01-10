package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.sql.Time;

@Entity
@Table(name = "recept")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class Recept {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(name = "idrecept")
    private Long idRecept;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "idKorisnik")
    private Korisnik korisnik;

    @Getter
    @Setter
    @Column(name = "nazivRecept")
    private String nazivRecept;

    @OneToMany
    @JoinColumn(name = "receptKategorije")
    private Set<ReceptKategorije> receptKategorije;

    @Getter
    @Setter
    @Column(name = "idkategorija")
    private Long idKategorija;

    @Getter
    @Setter
    @Column(name = "idreceptSastojak")
    private Long idReceptSastojak;

    @OneToMany
    @JoinColumn(name = "vrstaKuhinja")
    private Set<VrstaKuhinja> vrstaKuhinja;

    @Getter
    @Setter
    @Column(name = "idVrstaKuhinja")
    private Long idVrstaKuhinja;

    @Getter
    @Setter
    @Column(name = "priprema")
    private String Priprema;

    @Getter
    @Setter
    @Column(name = "vrijemeKuhanja")
    private Time vrijemeKuhanja;

    @Getter
    @Setter
    @Column(name = "oznaka")
    private String Oznaka;

    @Getter
    @Setter
    @Column(name = "slikaRecept")
    private String slikaRecept;

    @Getter
    @Setter
    @Column(name = "videoRecept")
    private String videoRecept;

    @Getter
    @Setter
    @Column(name = "vrijemeObjave")
    private LocalDate vrijemeObjave;

    @ManyToMany(mappedBy = "spremljeniRecepti")
    private Set<Korisnik> saved;

    @ManyToMany(mappedBy = "likedRecepti")
    private Set<Korisnik> liked;

    public Recept(String nazivRecept, Korisnik korisnik, Long idKategorija, Long idReceptSastojak,
                  Long idVrstaKuhinja, String priprema, Time vrijemeKuhanja,
                  String oznaka, String slikaRecept, String videoRecept) {
        this.nazivRecept = nazivRecept;
        this.korisnik = korisnik;
        this.idKategorija = idKategorija;
        this.idReceptSastojak = idReceptSastojak;
        this.idVrstaKuhinja = idVrstaKuhinja;
        this.Priprema = priprema;
        this.vrijemeKuhanja = vrijemeKuhanja;
        this.Oznaka = oznaka;
        this.slikaRecept = slikaRecept;
        this.videoRecept = videoRecept;
    }

}

