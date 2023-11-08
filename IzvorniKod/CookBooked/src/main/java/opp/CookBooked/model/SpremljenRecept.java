package opp.CookBooked.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "spremljenRecept")
@Data
@EqualsAndHashCode
public class SpremljenRecept {

    @Id
    private Long IDRecept;

    private Long IDKorisnik;

    public Long getIDRecept() {
        return IDRecept;
    }

    public Long getIDKorisnik() {
        return IDKorisnik;
    }

    public void setIDKorisnik(Long IDKorisnik) {
        this.IDKorisnik = IDKorisnik;
    }

    public void setIDRecept(Long IDRecept) {
        this.IDRecept = IDRecept;
    }
}
