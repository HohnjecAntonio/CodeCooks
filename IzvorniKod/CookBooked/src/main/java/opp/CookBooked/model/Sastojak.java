package opp.CookBooked.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "sastojak")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class Sastojak {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(name = "idSastojak")
    private Long idSastojak;

    @NotNull
    @Getter
    @Setter
    @Column(name = "nazivSastojak")
    private String nazivSastojak;

    @OneToMany(mappedBy = "sastojak")
    private Set<ReceptSastojci> receptSastojci;

    public Sastojak(String nazivSastojak) {
        this.nazivSastojak = nazivSastojak;
    }
    public Sastojak(Long idSastojak, String nazivSastojak) {
        this.idSastojak = idSastojak;
        this.nazivSastojak = nazivSastojak;
    }


}
