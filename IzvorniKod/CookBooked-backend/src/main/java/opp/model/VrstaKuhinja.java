package opp.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "vrstaKuhinja")
@Data
@EqualsAndHashCode
public class VrstaKuhinja {

    @Id
    @GeneratedValue
    @Column(name = "iDVrstaKuhinja")
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
