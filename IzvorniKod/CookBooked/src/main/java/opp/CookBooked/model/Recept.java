package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

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
    @Column(name = "idreceptsastojak")
    private Long idReceptSastojak;

    @OneToMany
    @JoinColumn(name = "vrstaKuhinja")
    private Set<VrstaKuhinja> vrstaKuhinja;

    @Getter
    @Setter
    @Column(name = "idvrstakuhinja")
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
    private String slikaRecept; // potorebno provjeriti

    @Getter
    @Setter
    @Column(name = "idvideorecept")
    private Long idVideoRecept;

    public Recept(String nazivRecept, Long idKategorija, Long idReceptSastojak,
                  Long idVrstaKuhinja, String priprema, Time vrijemeKuhanja,
                  String oznaka, String slikaRecept, Long idVideoRecept) {
        this.nazivRecept = nazivRecept;
        this.idKategorija = idKategorija;
        this.idReceptSastojak = idReceptSastojak;
        this.idVrstaKuhinja = idVrstaKuhinja;
        this.Priprema = priprema;
        this.vrijemeKuhanja = vrijemeKuhanja;
        this.Oznaka = oznaka;
        this.slikaRecept = slikaRecept;
        this.idVideoRecept = idVideoRecept;
    }

}

