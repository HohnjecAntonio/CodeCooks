package opp.CookBooked.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Time;

@Entity
@Table(name = "korisnik")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class Korisnik {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "idkorisnik")
    @Getter
    @Setter
    private Long idKorisnik;

    @NotNull
    @Column(name = "korisnickoIme", unique = true)
    @Getter
    @Setter
    private String korisnickoIme;

    @NotNull
    @Column(name = "lozinkaKorisnik")
    @Size(min = 6)
    @Getter
    @Setter
    private String lozinkaKorisnik;

    @Column(name = "imeKorisnik")
    @Getter
    @Setter
    private String imeKorisnik;

    @Column(name = "prezimeKorisnik")
    @Getter
    @Setter
    private String prezimeKorisnik;

    @Getter
    @Setter
    private String brojTelefona;

    @Column(name = "emailKorisnik")
    @Getter
    @Setter
    private String emailKorisnik;

    @Getter
    @Setter
    private String razinaOvlasti;

    @Getter
    @Setter
    private Time dostupan;

    public Korisnik(String korisnickoIme, String lozinkaKorisnik, String emailKorisnik) {
        this.korisnickoIme = korisnickoIme;
        this.lozinkaKorisnik = lozinkaKorisnik;
        this.emailKorisnik = emailKorisnik;
    }

}
