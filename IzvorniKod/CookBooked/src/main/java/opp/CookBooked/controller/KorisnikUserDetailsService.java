package opp.CookBooked.controller;


import opp.CookBooked.model.Korisnik;
import opp.CookBooked.service.implementacija.KorisnikServiceJpa;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

@Service
public class KorisnikUserDetailsService implements UserDetailsService {
    @Autowired
    private KorisnikServiceJpa korisnikService;

    @Value("${CookBooked.admin.password}")
    private String adminPasswordHash;

    @Override
    public UserDetails loadUserByUsername(String username){

        if("admin".equals(username)){
            return new User(
                    username,
                    adminPasswordHash,
                    commaSeparatedStringToAuthorityList("ROLE_ADMIN")
            );
        }

        Korisnik korisnik = korisnikService.findByKorisnickoIme(username).orElseThrow(
                () -> new UsernameNotFoundException("No user '" + username + "'")
        );

        return new User(
                username,
                korisnik.getLozinkaKorisnik(),
                commaSeparatedStringToAuthorityList("ROLE_REGISTERED")
        );
    }
}
