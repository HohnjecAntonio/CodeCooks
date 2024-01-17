package opp.CookBooked.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class LoginDTO {
    @Getter
    private String korisnickoIme;
    @Getter
    private String lozinkaKorisnik;

}
