package opp.CookBooked.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "vrsteKuhinjaRecepta")
public class VrsteKuhinjaRecepta {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    @Setter
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idRecept")
    @Getter
    @Setter
    private Recept recept;

    @ManyToOne
    @JoinColumn(name = "idVrstaKuhinje")
    @Getter
    @Setter
    private VrstaKuhinje vrstaKuhinje;

    public VrsteKuhinjaRecepta(Recept recept, VrstaKuhinje vrstaKuhinje) {
        this.recept = recept;
        this.vrstaKuhinje = vrstaKuhinje;
    }

}
