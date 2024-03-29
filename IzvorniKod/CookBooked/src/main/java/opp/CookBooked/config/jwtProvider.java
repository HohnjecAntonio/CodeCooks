package opp.CookBooked.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;

import javax.crypto.SecretKey;
import java.util.Date;

public class jwtProvider {

    private static SecretKey key = Keys.hmacShaKeyFor(jwtConstants.SECRET_KEY.getBytes());
    public static String generateToken(Authentication auth) {

        return Jwts.builder()
                .setIssuer("CodeCooks").setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime() + 86400000))
                .claim("korisnickoIme", auth.getName())
                .signWith(key)
                .compact();
    }

    public static String getUsernameFromJwtToken(String jwt) {
        // Bearer token
        jwt = jwt.substring(7);

        Claims claims = Jwts.parserBuilder().
                setSigningKey(key).build().
                parseClaimsJws(jwt).getBody();

        return String.valueOf(claims.get("korisnickoIme"));
    }
}
