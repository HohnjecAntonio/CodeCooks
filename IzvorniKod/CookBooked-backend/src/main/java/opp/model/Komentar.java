package opp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Entity
@Data
@EqualsAndHashCode
public class Komentar {

    @Id
    @GeneratedValue
    private Long IDKomentar;

    private Long IDObjava;

    private Long IDKorisnik;

    private String NaslovKomentar;

    private String OpisKomentar;

    private Date DatumKomentar;

    public Long getIDKorisnik() {
        return IDKorisnik;
    }

    public Date getDatumKomentar() {
        return DatumKomentar;
    }

    public Long getIDKomentar() {
        return IDKomentar;
    }

    public Long getIDObjava() {
        return IDObjava;
    }

    public String getNaslovKomentar() {
        return NaslovKomentar;
    }

    public String getOpisKomentar() {
        return OpisKomentar;
    }

    public void setIDKorisnik(Long IDKorisnik) {
        this.IDKorisnik = IDKorisnik;
    }

    public void setDatumKomentar(Date datumKomentar) {
        DatumKomentar = datumKomentar;
    }

    public void setIDKomentar(Long IDKomentar) {
        this.IDKomentar = IDKomentar;
    }

    public void setIDObjava(Long IDObjava) {
        this.IDObjava = IDObjava;
    }

    public void setNaslovKomentar(String naslovKomentar) {
        NaslovKomentar = naslovKomentar;
    }

    public void setOpisKomentar(String opisKomentar) {
        OpisKomentar = opisKomentar;
    }
}
