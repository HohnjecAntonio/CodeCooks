package opp.CookBooked.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "receptKategorije")
public class ReceptKategorije {

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
    @JoinColumn(name = "idKategorija")
    @Getter
    @Setter
    private Kategorija kategorija;

    public ReceptKategorije(Recept recept, Kategorija kategorija) {
        this.kategorija = kategorija;
        this.recept = recept;
    }

}
