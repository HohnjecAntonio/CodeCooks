package opp.CookBooked.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.sql.Time;

@Entity
@Table(name = "video")
@Data
@EqualsAndHashCode
public class Video {

    @Id
    @GeneratedValue
    private Long IDVideo;

    private String NazivVideo;

    private Time TrajanjeVideo;

    private String Poveznica;

    public Long getIDVideo() {
        return IDVideo;
    }

    public String getNazivVideo() {
        return NazivVideo;
    }

    public String getPoveznica() {
        return Poveznica;
    }

    public Time getTrajanjeVideo() {
        return TrajanjeVideo;
    }

    public void setIDVideo(Long IDVideo) {
        this.IDVideo = IDVideo;
    }

    public void setNazivVideo(String nazivVideo) {
        NazivVideo = nazivVideo;
    }

    public void setPoveznica(String poveznica) {
        Poveznica = poveznica;
    }

    public void setTrajanjeVideo(Time trajanjeVideo) {
        TrajanjeVideo = trajanjeVideo;
    }
}
