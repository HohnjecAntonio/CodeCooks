package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Time;

@Entity
@Table(name = "obavijesti")
@Data
@EqualsAndHashCode
public class Obavijesti {

    @Id
    @GeneratedValue
    private Long IDObavijest;

    @ManyToOne
    @JoinColumn(name = "korisnik", referencedColumnName = "iDKorisnik")
    private Korisnik korisnik;

    private Long IDKorisnik;

    private String NazivObavijest;

    private String SadrzajObavijest;

    private Time DatumObavijest;

    private Integer JeProcitano;

    public Long getIDKorisnik() {
        return IDKorisnik;
    }

    public Integer getJeProcitano() {
        return JeProcitano;
    }

    public Long getIDObavijest() {
        return IDObavijest;
    }

    public String getNazivObavijest() {
        return NazivObavijest;
    }

    public String getSadrzajObavijest() {
        return SadrzajObavijest;
    }

    public Time getDatumObavijest() {
        return DatumObavijest;
    }

    public void setIDKorisnik(Long IDKorisnik) {
        this.IDKorisnik = IDKorisnik;
    }

    public void setDatumObavijest(Time datumObavijest) {
        DatumObavijest = datumObavijest;
    }

    public void setIDObavijest(Long IDObavijest) {
        this.IDObavijest = IDObavijest;
    }

    public void setJeProcitano(Integer jeProcitano) {
        JeProcitano = jeProcitano;
    }

    public void setNazivObavijest(String nazivObavijest) {
        NazivObavijest = nazivObavijest;
    }

    public void setSadrzajObavijest(String sadrzajObavijest) {
        SadrzajObavijest = sadrzajObavijest;
    }
}
