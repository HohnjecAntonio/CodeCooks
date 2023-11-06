package opp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "kategorija")
@Data
@EqualsAndHashCode
public class Kategorija {

    @Id
    @GeneratedValue
    private Long IDKategorija;

    @NotNull
    private String NazivKategorija;

    public Long getIDKategorija() {
        return IDKategorija;
    }

    public void setIDKategorija(Long IDKategorija) {
        this.IDKategorija = IDKategorija;
    }

    public String getNazivKategorija() {
        return NazivKategorija;
    }

    public void setNazivKategorija(String nazivKategorija) {
        NazivKategorija = nazivKategorija;
    }
}
