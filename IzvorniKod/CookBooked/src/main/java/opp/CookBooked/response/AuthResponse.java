package opp.CookBooked.response;


import lombok.Getter;
import lombok.Setter;

public class AuthResponse {

    @Getter
    @Setter
    private String token;
    @Getter
    @Setter
    private String message;

    public AuthResponse(String token, String message) {
        super();
        this.token = token;
        this.message = message;
    }
}
