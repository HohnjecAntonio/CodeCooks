package opp.CookBooked.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "komentariRecept")
public class KomentariRecept {

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
    @JoinColumn(name = "idKomentar")
    @Getter
    @Setter
    private Komentar komentar;

    public KomentariRecept(Recept recept, Komentar komentar) {
        this.recept = recept;
        this.komentar = komentar;
    }

}
