package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "receptSastojci")
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ReceptSastojci {

    @Id
    @Getter
    @Setter
    @Column(name = "idrecept")
    private Long idRecept;

    @Getter
    @Setter
    @Column(name = "idSastojak")
    private Long idSastojak;

    @Getter
    @Setter
    @Column(name = "kolicinaSastojak")
    private String kolicinaSastojak;

}
