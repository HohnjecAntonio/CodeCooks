package opp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;
import java.util.Set;

import java.sql.Time;

@Entity
@Table(name = "recept")
@Data
@EqualsAndHashCode
public class Recept {

    @Id
    @GeneratedValue
    @Column(name = "iDRecept")
    private Long IDRecept;

    @NotNull
    private String NazivRecept;

    private Long IDKategorija;

    private Long IDSastojak;

    private Long IDVrstaKuhinje;

    private String Priprema;

    private Time VrijemeKuhanja;

    private String Oznaka; // oznaka: vegetarijansko, bezglutensko ili na engl. tag

    private String SlikaRecept; // ?? Onda bolje link koji može bit il slika il dokument poput worda

    private Long IDVideoRecept;

    //@OneToMany
    //@JoinColumn(name = "receptKategorije", referencedColumnName = "iDKategorija")
    //private Set<ReceptKategorije> receptKategorije;

    //@OneToMany
    //@JoinColumn(name = "vrstaKuhinja", referencedColumnName = "iDVrstaKuhinja")
    //private Set<VrstaKuhinja> vrstaKuhinja;

    public Long getIDRecept() {
        return IDRecept;
    }

    public Long getIDKategorija() {
        return IDKategorija;
    }

    public Long getIDSastojak() {
        return IDSastojak;
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

    public void setIDSastojak(Long IDSastojak) {
        this.IDSastojak = IDSastojak;
    }

    public void setIDVideoRecept(Long IDVideoRecept) {
        this.IDVideoRecept = IDVideoRecept;
    }

    public void setIDVrstaKuhinje(Long IDVrstaKuhinje) {
        this.IDVrstaKuhinje = IDVrstaKuhinje;
    }
}

