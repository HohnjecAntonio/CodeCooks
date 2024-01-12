package opp.CookBooked.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.sql.Time;
import java.util.*;

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

    @OneToMany(mappedBy = "follower")
    @JsonIgnore
    private Set<Pratioci> follows;

    @OneToMany(mappedBy = "following")
    @JsonIgnore
    private Set<Pratioci> followers;

    @OneToMany(mappedBy = "korisnik")
    @JsonIgnore
    private Set<SpremljeniRecepti> spremljeniRecepti;

    @OneToMany(mappedBy = "korisnik")
    @JsonIgnore
    private Set<OznacavanjeRecepata> oznaceniRecepti;

    public Korisnik(String korisnickoIme, String lozinkaKorisnik, String emailKorisnik) {
        this.korisnickoIme = korisnickoIme;
        this.lozinkaKorisnik = lozinkaKorisnik;
        this.emailKorisnik = emailKorisnik;
    }

}
