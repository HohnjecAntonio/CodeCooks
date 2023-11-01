package opp.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;

import java.sql.Time;

@Entity
public class Korisnik {

    @Id
    @GeneratedValue
    private Long IDKorisnik;

    @NotNull
    @Column(unique = true)
    private String KorisnickoIme;

    @NotNull
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
        return KorisnickoIme;
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
        KorisnickoIme = korisnickoIme;
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
}
