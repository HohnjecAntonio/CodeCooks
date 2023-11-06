package opp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "oznRecept")
@Data
@EqualsAndHashCode
public class OznRecept {

    @Id
    private Long IDRecept;

    @ManyToOne
    @JoinColumn(name = "korisnik", referencedColumnName = "iDKorisnik")
    private Korisnik korisnici;

    private Long IDKorisnik;

    public Long getIDRecept() {
        return IDRecept;
    }

    public Long getIDKorisnik() {
        return IDKorisnik;
    }

    public void setIDRecept(Long IDRecept) {
        this.IDRecept = IDRecept;
    }

    public void setIDKorisnik(Long IDKorisnik) {
        this.IDKorisnik = IDKorisnik;
    }
}
