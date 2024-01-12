package opp.CookBooked.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "spremljeniRecepti")
public class SpremljeniRecepti {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    @Getter
    @Setter
    private Long id;

    @ManyToOne
    @JoinColumn(name = "idKorisnik")
    @Getter
    @Setter
    private Korisnik korisnik;

    @ManyToOne
    @JoinColumn(name = "idRecept")
    @Getter
    @Setter
    private Recept recept;

    public SpremljeniRecepti(Korisnik korisnik, Recept recept) {
        this.korisnik = korisnik;
        this.recept = recept;
    }

}
