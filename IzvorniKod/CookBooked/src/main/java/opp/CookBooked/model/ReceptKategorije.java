package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "receptKategorije")
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ReceptKategorije {

    @Id
    @Column(name = "idrecept")
    @Getter
    @Setter
    private Long idRecept;

    @Getter
    @Setter
    @Column(name = "idkategorija")
    private Long idKategorija;

}
