package opp.CookBooked.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

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

    public Sastojak(String nazivSastojak) {
        this.nazivSastojak = nazivSastojak;
    }

}
