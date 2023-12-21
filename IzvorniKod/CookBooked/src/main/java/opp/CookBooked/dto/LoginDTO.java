package opp.CookBooked.dto;

import lombok.Getter;

public class LoginDTO {
    @Getter
    private String korisnickoIme;
    @Getter
    private String lozinkaKorisnik;
    public LoginDTO() {
    }
    public LoginDTO(String korisnickoIme, String lozinkaKorisnik) {
        this.korisnickoIme = korisnickoIme;
        this.lozinkaKorisnik = lozinkaKorisnik;
    }
}
