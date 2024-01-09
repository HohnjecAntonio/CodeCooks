package opp.CookBooked.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.*;

@Entity
@Table(name = "spremljenRecept")
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class SpremljenRecept {

    @Id
    @Getter
    @Setter
    @Column(name = "idrecept")
    private Long idRecept;

    @Getter
    @Setter
    @Column(name = "idkorisnik")
    private Long idKorisnik;

}
