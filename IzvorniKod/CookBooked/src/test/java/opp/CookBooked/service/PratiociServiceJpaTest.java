package opp.CookBooked.service;

import opp.CookBooked.dto.FollowDTO;
import opp.CookBooked.model.Korisnik;
import opp.CookBooked.model.Pratioci;
import opp.CookBooked.repository.PratiociRepository;
import opp.CookBooked.service.implementacija.PratiociServiceJpa;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

public class PratiociServiceJpaTest {

    @Mock
    private PratiociRepository pratiociRepo;

    @InjectMocks
    private PratiociServiceJpa pratiociService;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testFollowUser() {
        Korisnik follower = new Korisnik(1L, "user1");
        Korisnik following = new Korisnik(2L, "user2");

        when(pratiociRepo.findByFollowerAndFollowing(follower, following)).thenReturn(new Pratioci(follower, following));
        when(pratiociRepo.save(any(Pratioci.class))).thenReturn(new Pratioci(follower, following));

        Pratioci result = pratiociService.followUser(follower, following);

        assertNotNull(result);
        assertEquals(follower, result.getFollower());
        assertEquals(following, result.getFollowing());

    }

}
