package opp.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "receptKategorije")
@Data
@EqualsAndHashCode
public class ReceptKategorije {

    @Id
    @Column(name = "iDRecept")
    private Long IDRecept;

    @Column(name = "iDKategorija")
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
