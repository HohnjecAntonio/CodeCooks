package opp.CookBooked.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "kategorija")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class Kategorija {

    @Getter
    @Setter
    @Id
    @GeneratedValue
    @Column(name = "idkategorija")
    private Long idKategorija;

    @Getter
    @Setter
    @NotNull
    @Column(name = "nazivKategorija")
    private String nazivKategorija;

    public Kategorija(String nazivKategorija) {
        this.nazivKategorija = nazivKategorija;
    }

}
