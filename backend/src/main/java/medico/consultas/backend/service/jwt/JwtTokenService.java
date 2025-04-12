package medico.consultas.backend.service.jwt;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;
import java.util.List;

import org.springframework.stereotype.Service;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;

import medico.consultas.backend.model.UserDetailsImpl;

@Service
public class JwtTokenService {

    private static final String SECRET_KEY = "4Z^XrroxR@dWxqf$mTTKwW$!@#qGr4P";

    private static final String ISSUER = "pizzurg-api";

    public String generateToken(UserDetailsImpl user) {
        try {
          
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            
            List<String> roles = user.getAuthorities().stream()
                    .map(authority -> authority.getAuthority())
                    .toList();

            return JWT.create()
                    .withIssuer(ISSUER)
                    .withIssuedAt(creationDate())
                    .withExpiresAt(expirationDate()) 
                    .withSubject(user.getUsername())
                    .withClaim("roles",roles )
                    .sign(algorithm);
            
        } catch (JWTCreationException exception){
            throw new JWTCreationException("Erro ao gerar token.", exception);
        }
    }

    public String getSubjectFromToken(String token) {
        try {
            Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
            return JWT.require(algorithm)
                    .withIssuer(ISSUER)
                    .build()
                    .verify(token)
                    .getSubject();
        } catch (JWTVerificationException exception){
            throw new JWTVerificationException("Token inválido ou expirado.");
        }
    }

    private Date creationDate() {
        return Date.from(ZonedDateTime.now(ZoneId.of("America/Recife")).toInstant());
    }

    private Date expirationDate() {
        return Date.from(ZonedDateTime.now(ZoneId.of("America/Recife")).plusHours(4).toInstant());
    }

}