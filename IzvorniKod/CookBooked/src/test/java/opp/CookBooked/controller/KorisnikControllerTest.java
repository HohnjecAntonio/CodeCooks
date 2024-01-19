package opp.CookBooked.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import opp.CookBooked.config.jwtProvider;
import opp.CookBooked.dto.ProfilDTO;
import opp.CookBooked.dto.ProfilDrugogKorisnikaDTO;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.service.KorisnikService;
import opp.CookBooked.service.PratiociService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(KorisnikController.class)
public class KorisnikControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private KorisnikService korisnikService;

    @MockBean
    private PratiociService pratiociService;

    private String mockToken;

    @BeforeEach
    public void setUp() throws Exception {
        when(korisnikService.fetch(1L)).thenReturn(createMockKorisnik());
        mockToken = jwtProvider.generateToken(new UsernamePasswordAuthenticationToken("ak", "pass12345"));
    }

    private Korisnik createMockKorisnik() {
        Korisnik korisnik = new Korisnik();
        korisnik.setIdKorisnik(1L);
        korisnik.setKorisnickoIme("ak");
        korisnik.setLozinkaKorisnik("pass12345");
        korisnik.setImeKorisnik("John");
        korisnik.setPrezimeKorisnik("Doe");
        korisnik.setBrojTelefona("1234567890");
        korisnik.setEmailKorisnik("john.doe@example.com");
        return korisnik;
    }

    private ProfilDrugogKorisnikaDTO createMockProfilDrugogKorisnikaDTO() {
        ProfilDrugogKorisnikaDTO profilDTO = new ProfilDrugogKorisnikaDTO();
        profilDTO.setKorisnickoIme("testUser");
        return profilDTO;
    }

    private ProfilDTO createMockProfilDTO() {
        ProfilDTO profilDTO = new ProfilDTO();
        profilDTO.setKorisnickoIme("testUser");
        return profilDTO;
    }

    @Test
    public void testGetKorisnikById() throws Exception {
        Korisnik mockKorisnik = createMockKorisnik();
        when(korisnikService.fetch(1L)).thenReturn(mockKorisnik);

        mockMvc.perform(get("/korisnici/id/1")
                        .header("Authorization", "Bearer " + mockToken)
                        .contentType("application/json"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.idKorisnik").value(1))
                .andExpect(jsonPath("$.korisnickoIme").value("ak"));

    }

    @Test
    public void testGetProfileDK() throws Exception {
        ProfilDrugogKorisnikaDTO mockProfilDTO = createMockProfilDrugogKorisnikaDTO();
        when(korisnikService.fetchZaProfil("testUser")).thenReturn(mockProfilDTO);

        mockMvc.perform(get("/korisnici/profileDK/testUser"))
                .andExpect(status().isOk())
                .andExpect(content().contentType("application/json"))
                .andExpect(jsonPath("$.korisnickoIme").value("testUser"));
    }

    @Test
    public void testFollowUser() throws Exception {
        when(korisnikService.findByIdKorisnik(1L)).thenReturn(new Korisnik(1L, "user1"));
        when(korisnikService.findByIdKorisnik(2L)).thenReturn(new Korisnik(2L, "user2"));

        mockMvc.perform(post("/korisnici/1/follow/2")
                        .header("Authorization", "Bearer " + mockToken))
                .andExpect(status().isOk());

        verify(pratiociService, times(1)).followUser(any(Korisnik.class), any(Korisnik.class));
    }

    @Test
    public void testDeleteKorisnik() throws Exception {
        when(korisnikService.deleteKorisnik(1L)).thenReturn(new Korisnik(1L, "user1"));

        mockMvc.perform(delete("/korisnici/delete/korisnik/1")
                        .header("Authorization", "Bearer " + mockToken))
                .andExpect(status().isOk());
    }

}
