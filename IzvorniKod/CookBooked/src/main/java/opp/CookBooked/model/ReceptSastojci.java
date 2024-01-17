package opp.CookBooked.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "receptSastojci")
public class ReceptSastojci {

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
    @JoinColumn(name = "idSastojak")
    @Getter
    @Setter
    private Sastojak sastojak;

    public ReceptSastojci(Recept recept, Sastojak sastojak) {
        this.recept = recept;
        this.sastojak = sastojak;
    }

}
