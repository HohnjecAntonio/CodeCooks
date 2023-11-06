package opp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Set;

@Entity
@Table(name = "omiljeniAutor")
@Data
@EqualsAndHashCode
public class OmiljeniAutor {

    @Id
    @GeneratedValue
    private Long Autor;

    @ManyToMany
    @JoinColumn(name = "korisnik", referencedColumnName = "iDKorisnik")
    private Set<Korisnik> korisnici;

    private Long IDKorisnik;

    public Long getAutor() {
        return Autor;
    }

    public Long getIDKorisnik() {
        return IDKorisnik;
    }

    public void setAutor(Long autor) {
        Autor = autor;
    }

    public void setIDKorisnik(Long IDKorisnik) {
        this.IDKorisnik = IDKorisnik;
    }
}
