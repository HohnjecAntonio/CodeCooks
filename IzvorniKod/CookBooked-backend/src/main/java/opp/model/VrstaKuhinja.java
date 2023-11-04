package opp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode
public class VrstaKuhinja {

    @Id
    @GeneratedValue
    private Long IDVrstaKuhinja;

    @NotNull
    private String NazivVrstaKuhinja;

    public Long getIDVrstaKuhinja() {
        return IDVrstaKuhinja;
    }

    public String getNazivVrstaKuhinja() {
        return NazivVrstaKuhinja;
    }

    public void setIDVrstaKuhinja(Long IDVrstaKuhinja) {
        this.IDVrstaKuhinja = IDVrstaKuhinja;
    }

    public void setNazivVrstaKuhinja(String nazivVrstaKuhinja) {
        NazivVrstaKuhinja = nazivVrstaKuhinja;
    }
}
