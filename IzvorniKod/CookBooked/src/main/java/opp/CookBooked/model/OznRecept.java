package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "oznRecept")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class OznRecept {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(name = "idrecept")
    private Long idRecept;

    @ManyToOne
    @JoinColumn(name = "korisnik", referencedColumnName = "iDKorisnik")
    private Korisnik korisnici;

    @Getter
    @Setter
    @Column(name = "idkorisnik")
    private Long idKorisnik;

    public OznRecept(Long idKorisnik) {
        this.idKorisnik = idKorisnik;
    }

}
