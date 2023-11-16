package hr.croz.progibe.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.math.BigInteger;

@Entity
@Table(name = "sometable")

public class SomeTable {
    @Id
    @Column(name = "id")
    private BigInteger id;

    @Column(name = "somedata")
    private String somedata;

    public SomeTable() {
    }

    public SomeTable(final BigInteger id, final String somedata) {
        this.id = id;
        this.somedata = somedata;
    }

    public BigInteger getId() {
        return id;
    }

    public void setId(final BigInteger id) {
        this.id = id;
    }

    public String getSomedata() {
        return somedata;
    }

    public void setSomedata(final String somedata) {
        this.somedata = somedata;
    }
}
