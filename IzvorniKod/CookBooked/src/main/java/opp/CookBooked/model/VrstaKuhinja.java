package opp.CookBooked.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Entity
@Table(name = "vrstaKuhinja")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class VrstaKuhinja {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(name = "idVrstaKuhinja")
    private Long idVrstaKuhinja;

    @NotNull
    @Getter
    @Setter
    @Column(name = "nazivVrstaKuhinja")
    private String nazivVrstaKuhinja;

    public VrstaKuhinja(String nazivVrstaKuhinja) {
        this.nazivVrstaKuhinja = nazivVrstaKuhinja;
    }

}
