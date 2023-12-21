package opp.CookBooked.response;


import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
public class AuthResponse {

    @Getter
    @Setter
    private String token;
    @Getter
    @Setter
    private String message;

}
