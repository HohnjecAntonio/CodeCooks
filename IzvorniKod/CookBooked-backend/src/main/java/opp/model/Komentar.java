package opp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Entity
@Table(name = "komentar")
@Data
@EqualsAndHashCode
public class Komentar {

    @Id
    @GeneratedValue
    private Long IDKomentar;

    @ManyToOne
    @JoinColumn(name = "objavaRecepata", referencedColumnName = "iDObjava")
    private ObjavaRecepta objavaRecepta;

    private Long IDObjava;

    @ManyToOne
    @JoinColumn(name = "korisnik", referencedColumnName = "iDKorisnik")
    private Korisnik korisnik;

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
