package opp.CookBooked.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "vrstaKuhinje")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class VrstaKuhinje {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(name = "idVrstaKuhinje")
    private Long idVrstaKuhinje;

    @NotNull
    @Getter
    @Setter
    @Column(name = "nazivVrstaKuhinje")
    private String nazivVrstaKuhinje;

    @OneToMany(mappedBy = "vrstaKuhinje")
    private Set<VrsteKuhinjaRecepta> receptVrsteKuhinja;

    public VrstaKuhinje(String nazivVrstaKuhinje) {
        this.nazivVrstaKuhinje = nazivVrstaKuhinje;
    }

    public VrstaKuhinje(Long idVrstaKuhinje, String nazivVrstaKuhinje) {
        this.idVrstaKuhinje = idVrstaKuhinje;
        this.nazivVrstaKuhinje = nazivVrstaKuhinje;
    }

}
