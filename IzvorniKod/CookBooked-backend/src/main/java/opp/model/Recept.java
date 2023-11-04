package opp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Time;

@Entity
@Data
@EqualsAndHashCode
public class Recept {

    @Id
    @GeneratedValue
    private Long IDRecept;

    private String NazivRecept;

    private Long IDKategorija;

    private Long IDReceptSastojak;

    private Long IDVrstaKuhinje;

    private String Priprema;

    private Time VrijemeKuhanja;

    private String Oznaka; // ???

    private String SlikaRecept; // ?? Onda bolje link koji može bit il slika il dokument poput worda

    private Long IDVideoRecept;

    public Long getIDRecept() {
        return IDRecept;
    }

    public Long getIDKategorija() {
        return IDKategorija;
    }

    public Long getIDReceptSastojak() {
        return IDReceptSastojak;
    }

    public Long getIDVideoRecept() {
        return IDVideoRecept;
    }

    public Long getIDVrstaKuhinje() {
        return IDVrstaKuhinje;
    }

    public String getNazivRecept() {
        return NazivRecept;
    }

    public String getOznaka() {
        return Oznaka;
    }

    public String getPriprema() {
        return Priprema;
    }

    public String getSlikaRecept() {
        return SlikaRecept;
    }

    public Time getVrijemeKuhanja() {
        return VrijemeKuhanja;
    }

    public void setNazivRecept(String nazivRecept) {
        NazivRecept = nazivRecept;
    }

    public void setOznaka(String oznaka) {
        Oznaka = oznaka;
    }

    public void setPriprema(String priprema) {
        Priprema = priprema;
    }

    public void setSlikaRecept(String slikaRecept) {
        SlikaRecept = slikaRecept;
    }

    public void setVrijemeKuhanja(Time vrijemeKuhanja) {
        VrijemeKuhanja = vrijemeKuhanja;
    }

    public void setIDRecept(Long IDRecept) {
        this.IDRecept = IDRecept;
    }

    public void setIDKategorija(Long IDKategorija) {
        this.IDKategorija = IDKategorija;
    }

    public void setIDReceptSastojak(Long IDReceptSastojak) {
        this.IDReceptSastojak = IDReceptSastojak;
    }

    public void setIDVideoRecept(Long IDVideoRecept) {
        this.IDVideoRecept = IDVideoRecept;
    }

    public void setIDVrstaKuhinje(Long IDVrstaKuhinje) {
        this.IDVrstaKuhinje = IDVrstaKuhinje;
    }
}

