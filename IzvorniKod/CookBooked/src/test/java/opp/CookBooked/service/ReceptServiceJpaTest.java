package opp.CookBooked.service;
import opp.CookBooked.dto.ReceptDTO;
import opp.CookBooked.dto.ReceptSubmitDTO;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Recept;
import opp.CookBooked.model.ReceptKategorije;
import opp.CookBooked.repository.KomentariReceptRepository;
import opp.CookBooked.repository.ReceptRepository;
import opp.CookBooked.service.implementacija.ReceptServiceJpa;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import opp.CookBooked.model.*;
import opp.CookBooked.repository.*;
import opp.CookBooked.service.*;
import opp.CookBooked.service.implementacija.ReceptServiceJpa;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;
import static org.junit.jupiter.api.Assertions.*;

public class ReceptServiceJpaTest {

    @InjectMocks
    private ReceptServiceJpa receptService;

    @Mock
    private ReceptRepository receptRepository;

    @Mock
    private KorisnikService korisnikService;

    @Mock
    private ReceptSastojciService recSasService;

    @Mock
    private ReceptKategorijeService reKatService;

    @Mock
    private KategorijaService katService;

    @Mock
    private VrsteKuhinjaReceptaService vrKuhService;

    @Mock
    private KomentariService komentariService;

    @Mock
    private OznacavanjeRecepataService oznRecService;

    @Mock
    private SpremljeniReceptiService spremRecService;

    @Mock
    private KomentariReceptRepository komRecRepo;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void testListReceptsForFeed() {

        Korisnik korisnik = new Korisnik(1L, "ak");

        when(receptRepository.findAll()).thenReturn(Collections.singletonList(new Recept(1L, korisnik, "Bolognese", "Miješati 5 minuta na tihoj vatri", "Brzo i lako", "n", "n", null, null)));

        when(recSasService.findAllByRecept(anyLong())).thenReturn(Collections.emptyList());
        when(katService.findAllByRecept(anyLong())).thenReturn(Collections.emptyList());
        when(vrKuhService.findAllByRecept(anyLong())).thenReturn(Collections.emptyList());
        when(oznRecService.findAllByRecept(anyLong())).thenReturn(Collections.emptyList());
        when(komentariService.findAllByRecept(anyLong())).thenReturn(Collections.emptyList());

        List<ReceptDTO> receptiZaFeed = receptService.listReceptsForFeed();
        assertNotNull(receptiZaFeed);
        assertFalse(receptiZaFeed.isEmpty());
    }

}
