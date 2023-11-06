package opp.model;

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
    @GeneratedValue
    @Column(name = "iDKorisnik")
    private Long IDKorisnik;

    @NotNull
    @Column(name = "korisnickoIme", unique = true)
    private String korisnickoIme;

    @NotNull
    @Size(min = 6)
    private String LozinkaKorisnik;
    private String ImeKorisnik;
    private String PrezimeKorisnik;
    private String BrojTelefona;
    private String EmailKorisnik;
    private String RazinaOvlasti;
    private Time Dostupan;

    public Long getIDKorisnik() {
        return IDKorisnik;
    }

    public String getKorisnickoIme() {
        return korisnickoIme;
    }

    public String getLozinkaKorisnik() {
        return LozinkaKorisnik;
    }

    public String getImeKorisnik() {
        return ImeKorisnik;
    }

    public String getPrezimeKorisnik() {
        return PrezimeKorisnik;
    }

    public String getBrojTelefona() {
        return BrojTelefona;
    }

    public String getEmailKorisnik() {
        return EmailKorisnik;
    }

    public String getRazinaOvlasti() {
        return RazinaOvlasti;
    }

    public Time getDostupan() {
        return Dostupan;
    }

    public void setKorisnickoIme(String korisnickoIme) {
        this.korisnickoIme = korisnickoIme;
    }

    public void setLozinkaKorisnik(String lozinkaKorisnik) {
        LozinkaKorisnik = lozinkaKorisnik;
    }

    public void setImeKorisnik(String imeKorisnik) {
        ImeKorisnik = imeKorisnik;
    }

    public void setPrezimeKorisnik(String prezimeKorisnik) {
        PrezimeKorisnik = prezimeKorisnik;
    }

    public void setBrojTelefona(String brojTelefona) {
        BrojTelefona = brojTelefona;
    }

    public void setEmailKorisnik(String emailKorisnik) {
        EmailKorisnik = emailKorisnik;
    }

    public void setRazinaOvlasti(String razinaOvlasti) {
        RazinaOvlasti = razinaOvlasti;
    }

    public void setDostupan(Time dostupan) {
        Dostupan = dostupan;
    }

    public void setIDKorisnik(Long IDKorisnik) {
        this.IDKorisnik = IDKorisnik;
    }
}
