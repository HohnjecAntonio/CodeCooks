package opp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode
public class OmiljeniAutor {

    @Id
    @GeneratedValue
    private Long Autor;

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
