package opp.CookBooked.controller;

import opp.CookBooked.config.jwtProvider;
import opp.CookBooked.dto.LoginDTO;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.repository.KorisnikRepository;
import opp.CookBooked.response.AuthResponse;
import opp.CookBooked.service.CustomerUserDetailsService;
import opp.CookBooked.service.KorisnikService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private KorisnikService korisnikService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private CustomerUserDetailsService customerUserDetails;

    @PostMapping("/signup")
    public AuthResponse createKorisnik(@RequestBody Korisnik korisnik) throws Exception {

        Korisnik postojiKorisnik = korisnikService.findByKorisnickoIme(korisnik.getKorisnickoIme());

        if (postojiKorisnik != null) throw new Exception("Već postoji korisnik s ovim korisničkim imenom.");

        Korisnik savedKorisnik = korisnikService.createKorisnik(korisnik);

        Authentication authentication = new UsernamePasswordAuthenticationToken(savedKorisnik.getKorisnickoIme(), savedKorisnik.getLozinkaKorisnik());
        String token = jwtProvider.generateToken(authentication);

        return new AuthResponse(token, "Uspješna registracija korisnika " + savedKorisnik.getKorisnickoIme() + ".");
    }

    @PostMapping("/signin")
    public AuthResponse signin (@RequestBody LoginDTO loginDTO) {
        Authentication authentication = authenticate(loginDTO.getKorisnickoIme(), loginDTO.getLozinkaKorisnik());

        String token = jwtProvider.generateToken(authentication);

        return new AuthResponse(token, "Uspješna prijava korisnika " + loginDTO.getKorisnickoIme() + ".");
    }

    private Authentication authenticate(String korisnickoIme, String lozinkaKorisnik) {
        UserDetails userDetails = customerUserDetails.loadUserByUsername(korisnickoIme);

        if (userDetails == null) {
            throw new BadCredentialsException("Pogrešno korisničko ime!");
        }
        if (!passwordEncoder.matches(lozinkaKorisnik, userDetails.getPassword())) {
            throw new BadCredentialsException("Pogrešna lozinka!");
        }

        return new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }

}
