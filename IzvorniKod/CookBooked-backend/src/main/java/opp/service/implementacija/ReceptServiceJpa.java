package opp.service.implementacija;

import opp.model.Korisnik;
import opp.model.Recept;
import opp.repository.ReceptRepository;
import opp.service.EntityMissingException;
import opp.service.ReceptService;
import opp.service.RequestDeniedException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import java.util.List;
import java.util.Optional;

@Service
public class ReceptServiceJpa implements ReceptService {

    @Autowired
    private ReceptRepository receptRepo;

    @Override
    public List<Recept> listAll() {
        return receptRepo.findAll();
    }

    @Override
    public Recept fetch(long id) {
        return findById(id).orElseThrow(
                () -> new EntityMissingException(Korisnik.class, id)
        );
    }

    @Override
    public Recept createRecept(Recept recept) {
        validate(recept);
        Assert.isNull(recept.getIDRecept(),
                "Recipe ID must be null, not: " + recept.getIDRecept()
        );
        if (receptRepo.countByIDRecept(recept.getIDRecept()) > 0)
            throw new RequestDeniedException(
                    "Recipe with id " + recept.getIDRecept() + " already exists."
            );
        return receptRepo.save(recept);
    }

    @Override
    public Optional<Recept> findById(long id) {
        return receptRepo.findByIDRecept(id);
    }

    @Override
    public Recept updateRecept(Recept recept) {
        validate(recept);
        long id = recept.getIDRecept();
        if (!receptRepo.existsByIDRecept(id))
            throw new EntityMissingException(Korisnik.class, id);
        return receptRepo.save(recept);
    }

    @Override
    public Recept deleteRecept(long id) {
        Recept recept = fetch(id);
        receptRepo.delete(recept);
        return recept;
    }

    private void validate(Recept recept) {
        Assert.notNull(recept, "Recept object must be given");
    }
}
