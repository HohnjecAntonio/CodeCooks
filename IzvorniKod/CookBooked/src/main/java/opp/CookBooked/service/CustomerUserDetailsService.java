package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.repository.KorisnikRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CustomerUserDetailsService implements UserDetailsService {

    @Autowired
    private KorisnikRepository korisnikRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        Korisnik korisnik = korisnikRepo.findByKorisnickoIme(username);
        if (korisnik == null) throw new UsernameNotFoundException("User not found with username " + username);

        List<GrantedAuthority> authorities = new ArrayList<>();

        return new User(korisnik.getKorisnickoIme(), korisnik.getLozinkaKorisnik(), authorities);
    }
}
