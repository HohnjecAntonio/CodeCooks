package opp.CookBooked.service.implementacija;

import jakarta.persistence.EntityNotFoundException;
import opp.CookBooked.dto.ReceptDTO;
import opp.CookBooked.dto.ReceptSubmitDTO;
import opp.CookBooked.model.*;
import opp.CookBooked.repository.*;
import opp.CookBooked.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;

@Service
public class ReceptServiceJpa implements ReceptService {

    @Autowired
    private ReceptRepository receptRepo;

    @Autowired
    private KorisnikService korisnikService;

    @Autowired
    private ReceptSastojciService recSasService;

    @Autowired
    private ReceptKategorijeService reKatService;

    @Autowired
    private KategorijaService katService;

    @Autowired
    private VrsteKuhinjaReceptaService vrKuhService;

    @Autowired
    private KomentariService komentariService;

    @Autowired
    private OznacavanjeRecepataService oznRecService;

    @Autowired
    private SpremljeniReceptiService spremRecService;

    @Autowired
    private KomentariReceptRepository komRecRepo;

    @Autowired
    private ReceptSastojciRepository recSasRepo;

    @Override
    public List<Recept> listAll() {
        try {
            return receptRepo.findAll();
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<ReceptDTO> listReceptsForFeed() {
        try {
            List<ReceptDTO> receptiZaFeed = new ArrayList<>();
            List<Recept> recepti = listAll();

            for (Recept r : recepti) {

                List<Sastojak> sastojci = recSasService.findAllByRecept(r.getIdRecept());
                List<Kategorija> kategorije = katService.findAllByRecept(r.getIdRecept());
                List<VrstaKuhinje> vrKuhinje = vrKuhService.findAllByRecept(r.getIdRecept());
                List<Korisnik> lajkovi = oznRecService.findAllByRecept(r.getIdRecept());
                List<Komentar> komentari = komentariService.findAllByRecept(r.getIdRecept());

                ReceptDTO rdto = new ReceptDTO();

                rdto.setIdRecept(r.getIdRecept());
                rdto.setNazivRecept(r.getNazivRecept());
                rdto.setAutor(r.getAutor().getKorisnickoIme());
                rdto.setSlikaRecept(r.getSlikaRecept());
                rdto.setVideoRecept(r.getVideoRecept());
                rdto.setVrijemeKuhanja(r.getVrijemeKuhanja());
                rdto.setOznaka(r.getOznaka());
                rdto.setVrijemeObjave(r.getVrijemeObjave());
                rdto.setSastojci(sastojci);
                rdto.setKategorije(kategorije);
                rdto.setVrsteKuhinje(vrKuhinje);
                rdto.setLajkovi(lajkovi);
                rdto.setKomentari(komentari);

                receptiZaFeed.add(rdto);
            }

            return receptiZaFeed;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public Recept findReceptById(long idRecept) {
        try {
            return receptRepo.findByIdRecept(idRecept);
        } catch (EntityNotFoundException e) {
            e.printStackTrace();
            return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public ReceptDTO findReceptDTOById(long idRecept) throws Exception {

        Recept recept = findReceptById(idRecept);

        if (recept != null) {

            List<Sastojak> sastojci = recSasService.findAllByRecept(recept.getIdRecept());
            List<Kategorija> kategorije = katService.findAllByRecept(recept.getIdRecept());
            List<VrstaKuhinje> vrKuhinje = vrKuhService.findAllByRecept(recept.getIdRecept());
            List<Korisnik> lajkovi = oznRecService.findAllByRecept(recept.getIdRecept());
            List<Komentar> komentari = komentariService.findAllByRecept(recept.getIdRecept());


            ReceptDTO r = new ReceptDTO();
            r.setIdRecept(recept.getIdRecept());
            r.setNazivRecept(recept.getNazivRecept());
            r.setAutor(recept.getAutor().getKorisnickoIme());
            r.setOznaka(recept.getOznaka());
            r.setPriprema(recept.getPriprema());
            r.setSlikaRecept(r.getSlikaRecept());
            r.setVideoRecept(recept.getVideoRecept());
            r.setVrijemeObjave(recept.getVrijemeObjave());
            r.setVrijemeKuhanja(recept.getVrijemeKuhanja());
            r.setSastojci(sastojci);
            r.setKategorije(kategorije);
            r.setVrsteKuhinje(vrKuhinje);
            r.setLajkovi(lajkovi);
            r.setKomentari(komentari);

            return r;
        } else return null;
    }

    @Override
    public List<Recept> findSpremljeneRecepteByIdKorisnik(long idKorisnik) {
        try {
            return receptRepo.findSpremljeniReceptiByIdKorisnik(idKorisnik);
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<Recept> findRecepteByAutor(long idKorisnik) {
        try {
            return receptRepo.findRecepteByAutor(idKorisnik);
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public List<ReceptDTO> findRecepteByAutorDTO(long idKorisnik) throws Exception {
        try {
            List<Recept> recepti = findRecepteByAutor(idKorisnik);
            List<ReceptDTO> dtos = new ArrayList<>();

            for (Recept r : recepti) {

                List<Sastojak> sastojci = recSasService.findAllByRecept(r.getIdRecept());
                List<Kategorija> kategorije = katService.findAllByRecept(r.getIdRecept());
                List<VrstaKuhinje> vrKuhinje = vrKuhService.findAllByRecept(r.getIdRecept());
                List<Korisnik> lajkovi = oznRecService.findAllByRecept(r.getIdRecept());
                List<Komentar> komentari = komentariService.findAllByRecept(r.getIdRecept());

                dtos.add(new ReceptDTO(
                        r.getIdRecept(),
                        r.getAutor().getKorisnickoIme(),
                        r.getNazivRecept(),
                        r.getPriprema(),
                        r.getVrijemeKuhanja(),
                        r.getOznaka(),
                        r.getSlikaRecept(),
                        r.getVideoRecept(),
                        r.getVrijemeObjave(),
                        vrKuhinje,
                        kategorije,
                        sastojci,
                        komentari,
                        lajkovi
                ));
            }

            return dtos;
        } catch (Exception e) {
            e.printStackTrace();
            return Collections.emptyList();
        }
    }

    @Override
    public Recept createRecept(ReceptSubmitDTO recept, long iDKorisnik) {
        try {
            Korisnik k = korisnikService.findByIdKorisnik(iDKorisnik);

            if (k != null) {

                String sastojci = recept.getSastojci();
                String[] sastojciList = sastojci.split(",");

                List<String> sas = new ArrayList<>(List.of(sastojciList));

                Recept noviRecept = new Recept();

                noviRecept.setNazivRecept(recept.getNazivRecept());
                noviRecept.setAutor(k);
                noviRecept.setPriprema(recept.getPriprema());
                noviRecept.setOznaka(recept.getOznaka());
                noviRecept.setVrijemeKuhanja(recept.getVrijemeKuhanja());
                noviRecept.setSlikaRecept(recept.getSlikaRecept());
                noviRecept.setVideoRecept(recept.getVideoRecept());
                noviRecept.setVrijemeObjave(LocalDate.now());

                receptRepo.save(noviRecept);
                reKatService.dodajKategorijuReceptu(noviRecept.getIdRecept(), recept.getIdKategorija());
                vrKuhService.dodajVrstuKuhinjeReceptu(noviRecept.getIdRecept(), recept.getIdVrstaKuhinje());
                recSasService.dodajSastojkeReceptu(noviRecept.getIdRecept(), sas);
                return noviRecept;

            }  else return null;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Recept updateRecept(long idRecept, Recept updatedRecept) {
        try {
            return receptRepo.findById(idRecept).map(recept -> {

                recept.setNazivRecept(updatedRecept.getNazivRecept());
                recept.setPriprema(updatedRecept.getPriprema());
                recept.setAutor(updatedRecept.getAutor());
                recept.setOznaka(updatedRecept.getOznaka());
                recept.setSlikaRecept(updatedRecept.getSlikaRecept());
                recept.setVideoRecept(updatedRecept.getVideoRecept());
                recept.setVrijemeObjave(LocalDate.now());
                recept.setVrijemeKuhanja(updatedRecept.getVrijemeKuhanja());

                return receptRepo.save(recept);
            }).orElseThrow(() -> new RuntimeException("Recept not found with id " + idRecept));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public String deleteRecept(long idRecept, long korisnikId) {
        try {
            Recept recept = findReceptById(idRecept);
            Korisnik korisnik = korisnikService.findByIdKorisnik(korisnikId);

            if (recept.getAutor().getIdKorisnik() != korisnikId) {
                throw new Exception("Ne možete obrisati ovaj recept jer niste njegov autor!");
            }

            if (recept != null) {

                spremRecService.obrisiRecept(korisnik, recept);
                oznRecService.obrisiOznaceReceptByIdKorisnik(korisnikId, idRecept);

                List<KomentariRecept> komentari = komRecRepo.findReceptsByKomentar(idRecept);
                for (KomentariRecept kr : komentari) {
                    Komentar kom = kr.getKomentar();
                    komRecRepo.delete(kr);
                    komentariService.obrisiKomentar(kom.getIdKomentar(), idRecept);
                }

                recSasService.obrisiSastojkeRecepta(idRecept);
                reKatService.obrisiKategorijuRecepta(idRecept);
                vrKuhService.obrisiRecept(idRecept);

                recept.setAutor(null);
                receptRepo.delete(recept);
                return "Recept s ID: " + recept.getIdRecept() + " od korisnika s ID: " + korisnikId + " uspješno obrisan.";
            } else return "Neuspješno";
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }
}
