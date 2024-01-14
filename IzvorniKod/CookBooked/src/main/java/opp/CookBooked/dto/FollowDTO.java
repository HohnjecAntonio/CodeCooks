package opp.CookBooked.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FollowDTO {

    @Setter
    private Long idKorisnik;

    @Setter
    private String korisnickoIme;

}
