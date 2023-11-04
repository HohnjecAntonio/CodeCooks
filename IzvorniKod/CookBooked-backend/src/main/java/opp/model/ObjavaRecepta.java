package opp.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Entity
@Data
@EqualsAndHashCode
public class ObjavaRecepta {

    @Id
    private Long IDObjava;

    private Long IDKorisnik;

    private Long IDRecept;

    private Date DatumObjava;
}
