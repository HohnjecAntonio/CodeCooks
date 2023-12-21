package opp.CookBooked.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Time;

@Entity
@Table(name = "korisnik")
@Data
@EqualsAndHashCode
public class Korisnik {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "idkorisnik")
    private Long idKorisnik;

    @NotNull
    @Column(name = "korisnickoIme", unique = true)
    private String korisnickoIme;

    @NotNull
    @Column(name = "lozinkaKorisnik")
    @Size(min = 6)
    private String lozinkaKorisnik;
    @Column(name = "imeKorisnik")
    private String imeKorisnik;
    @Column(name = "prezimeKorisnik")
    private String prezimeKorisnik;
    private String brojTelefona;
    @Column(name = "emailKorisnik")
    private String emailKorisnik;
    private String razinaOvlasti;
    private Time dostupan;

    public Korisnik() {

    }

    public Korisnik(String korisnickoIme, String lozinkaKorisnik, String emailKorisnik) {
        this.korisnickoIme = korisnickoIme;
        this.lozinkaKorisnik = lozinkaKorisnik;
        this.emailKorisnik = emailKorisnik;
    }

    public Long getIDKorisnik() {
        return idKorisnik;
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public String getLozinkaKorisnik() {
        return lozinkaKorisnik;
    }

    public String getImeKorisnik() {
        return imeKorisnik;
    }

    public String getPrezimeKorisnik() {
        return prezimeKorisnik;
    }

    public String getBrojTelefona() {
        return brojTelefona;
    }

    public String getEmailKorisnik() {
        return emailKorisnik;
    }

    public String getRazinaOvlasti() {
        return razinaOvlasti;
    }

    public Time getDostupan() {
        return dostupan;
    }

    public void setKorisnickoIme(String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
    }

    public void setLozinkaKorisnik(String lozinkaKorisnik) {
        this.lozinkaKorisnik = lozinkaKorisnik;
    }

    public void setImeKorisnik(String imeKorisnik) {
        this.imeKorisnik = imeKorisnik;
    }

    public void setPrezimeKorisnik(String prezimeKorisnik) {
        this.prezimeKorisnik = prezimeKorisnik;
    }

    public void setBrojTelefona(String brojTelefona) {
        this.brojTelefona = brojTelefona;
    }

    public void setEmailKorisnik(String emailKorisnik) {
        this.emailKorisnik = emailKorisnik;
    }

    public void setRazinaOvlasti(String razinaOvlasti) {
        this.razinaOvlasti = razinaOvlasti;
    }

    public void setDostupan(Time dostupan) {
        this.dostupan = dostupan;
    }

    public void setIDKorisnik(Long IDKorisnik) {
        this.idKorisnik = IDKorisnik;
    }
}
