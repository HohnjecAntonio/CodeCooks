package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name = "komentar")
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class Komentar {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "idkomentar")
    @Getter
    @Setter
    private Long idKomentar;

    @ManyToOne
    @JoinColumn(name = "idkorisnik")
    @Getter
    @Setter
    private Korisnik korisnik;

    @Getter
    @Setter
    @Column(name = "opisKomentar")
    private String opisKomentar;

    @Getter
    @Setter
    @Column(name = "datumKomentar")
    private LocalDate datumKomentar;

    public Komentar(String opisKomentar, LocalDate datumKomentar) {
        this.opisKomentar = opisKomentar;
        this.datumKomentar = datumKomentar;
    }

}
