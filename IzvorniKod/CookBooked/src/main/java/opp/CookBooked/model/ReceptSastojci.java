package opp.CookBooked.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "receptSastojci")
@Data
@EqualsAndHashCode
public class ReceptSastojci {

    @Id
    private Long IDRecept;

    private Long IDSastojak;

    private String KolicinaSastojak;

    public Long getIDRecept() {
        return IDRecept;
    }

    public Long getIDSastojak() {
        return IDSastojak;
    }

    public String getKolicinaSastojak() {
        return KolicinaSastojak;
    }

    public void setKolicinaSastojak(String kolicinaSastojak) {
        KolicinaSastojak = kolicinaSastojak;
    }

    public void setIDRecept(Long IDRecept) {
        this.IDRecept = IDRecept;
    }

    public void setIDSastojak(Long IDSastojak) {
        this.IDSastojak = IDSastojak;
    }
}
