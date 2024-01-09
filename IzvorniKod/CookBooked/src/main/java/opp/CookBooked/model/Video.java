package opp.CookBooked.model;

import jakarta.persistence.*;
import lombok.*;

import java.sql.Time;

@Entity
@Table(name = "video")
@Data
@EqualsAndHashCode
@NoArgsConstructor
public class Video {

    @Id
    @GeneratedValue
    @Getter
    @Setter
    @Column(name = "idvideo")
    private Long idVideo;

    @Getter
    @Setter
    @Column(name = "nazivVideo")
    private String nazivVideo;

    @Getter
    @Setter
    @Column(name = "trajanjeVideo")
    private Time trajanjeVideo;

    @Getter
    @Setter
    @Column(name = "poveznica")
    private String Poveznica;

    public Video(String nazivVideo, Time trajanjeVideo, String poveznica) {
        this.nazivVideo = nazivVideo;
        this.trajanjeVideo = trajanjeVideo;
        this.Poveznica = poveznica;
    }
}
