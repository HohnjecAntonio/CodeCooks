package opp.CookBooked.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.Date;

@Entity
@Table(name = "objavaRecepata")
@Data
@EqualsAndHashCode
public class ObjavaRecepta {

    @Id
    @Column(name = "iDObjava")
    private Long IDObjava;

    private Long IDKorisnik;

    private Long IDRecept;

    private Date DatumObjava;
}
