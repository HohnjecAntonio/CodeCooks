package opp.CookBooked.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

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

    @OneToMany(mappedBy = "kategorija")
    private Set<ReceptKategorije> receptKategorije;

    public Kategorija(String nazivKategorija) {
        this.nazivKategorija = nazivKategorija;
    }

}
