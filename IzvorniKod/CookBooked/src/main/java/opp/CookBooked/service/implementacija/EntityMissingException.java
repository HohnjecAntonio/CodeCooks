package opp.CookBooked.service.implementacija;

import org.springframework.web.bind.annotation.ResponseStatus;

import static org.springframework.http.HttpStatus.NOT_FOUND;

@ResponseStatus(NOT_FOUND)
public class EntityMissingException extends RuntimeException {

    private static final long serialVersionUID = 10L;

    public EntityMissingException(Class<?> cls, Object ref) {
        super("Entitet s referencom " + ref + " : " + cls + " nije pronađen.");
    }
}
