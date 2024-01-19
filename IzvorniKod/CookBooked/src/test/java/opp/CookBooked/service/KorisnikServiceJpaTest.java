package opp.CookBooked.service;

import opp.CookBooked.model.Korisnik;
import opp.CookBooked.repository.KorisnikRepository;
import opp.CookBooked.service.implementacija.KorisnikServiceJpa;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.Mockito.*;

public class KorisnikServiceJpaTest {

    @InjectMocks
    private KorisnikServiceJpa korisnikService;

    @Mock
    private KorisnikRepository korisnikRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testCreateKorisnik() throws Exception {
        when(korisnikRepository.save(any())).thenReturn(new Korisnik());

        Korisnik korisnik = new Korisnik();
        korisnik.setIdKorisnik(1L);
        korisnik.setKorisnickoIme("test");
        korisnik.setLozinkaKorisnik("password");
        Korisnik createdKorisnik = korisnikService.createKorisnik(korisnik);
        assertNotNull(createdKorisnik);
    }

}
