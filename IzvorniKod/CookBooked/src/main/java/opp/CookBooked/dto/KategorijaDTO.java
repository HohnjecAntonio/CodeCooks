package opp.CookBooked.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class KategorijaDTO {

    private Long idKategorija;

    private String nazivKategorija;

    private List<ReceptKatDTO> recepti;

}
