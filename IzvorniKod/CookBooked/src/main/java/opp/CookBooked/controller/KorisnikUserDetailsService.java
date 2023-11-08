package opp.CookBooked.controller;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import static org.springframework.security.core.authority.AuthorityUtils.commaSeparatedStringToAuthorityList;

@Service
public class KorisnikUserDetailsService implements UserDetailsService {
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
        else throw new UsernameNotFoundException("No user " + username);
    }
}