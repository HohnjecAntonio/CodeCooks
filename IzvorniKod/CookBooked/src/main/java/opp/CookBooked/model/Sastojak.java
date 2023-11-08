package opp.CookBooked.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "sastojak")
@Data
@EqualsAndHashCode
public class Sastojak {

    @Id
    @GeneratedValue
    private Long IDSastojak;

    @NotNull
    private String NazivSastojak;

    public Long getIDSastojak() {
        return IDSastojak;
    }

    public void setIDSastojak(Long IDSastojak) {
        this.IDSastojak = IDSastojak;
    }

    public String getNazivSastojak() {
        return NazivSastojak;
    }

    public void setNazivSastojak(String nazivSastojak) {
        NazivSastojak = nazivSastojak;
    }
}
