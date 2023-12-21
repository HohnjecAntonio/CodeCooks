package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Entity
@Table(name = "omiljeniAutor")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class OmiljeniAutor {

    @Id
    @GeneratedValue
    @Setter
    @Column(name = "idautor")
    private Long idAutor;

    @Setter
    @Column(name = "idkorisnik")
    private Long idKorisnik;

//    @ManyToMany
//    @JoinColumn(name = "korisnik", referencedColumnName = "idkorisnik")
//    private Set<Korisnik> korisnici;
}
