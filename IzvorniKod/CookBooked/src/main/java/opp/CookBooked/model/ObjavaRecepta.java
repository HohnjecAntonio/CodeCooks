package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Table(name = "objavaRecepta")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class ObjavaRecepta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idobjava")
    @Getter
    @Setter
    private Long idObjava;

    @Getter
    @Setter
    @ManyToOne
    @JoinColumn(name = "idkorisnik")
    private Korisnik korisnik;

    @Getter
    @Setter
    @OneToOne
    @JoinColumn(name = "idrecept")
    private Recept recept;

    @Getter
    @Setter
    @Column(name = "datumObjava")
    private Date datumObjava;

    public ObjavaRecepta(Korisnik korisnik, Recept recept, Date datumObjava) {
        this.korisnik = korisnik;
        this.recept = recept;
        this.datumObjava = datumObjava;
    }
}
