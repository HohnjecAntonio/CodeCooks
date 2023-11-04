package opp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Data
@EqualsAndHashCode
public class ReceptKategorije {

    @Id
    private Long IDRecept;

    private Long IDKategorija;

    public Long getIDRecept() {
        return IDRecept;
    }

    public Long getIDKategorija() {
        return IDKategorija;
    }

    public void setIDRecept(Long IDRecept) {
        this.IDRecept = IDRecept;
    }

    public void setIDKategorija(Long IDKategorija) {
        this.IDKategorija = IDKategorija;
    }
}
