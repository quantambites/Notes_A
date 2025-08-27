package notes_server.example.notes_server.JWT;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    public final String SECRET = "hhjgfcuecgkjide$#m3345367";

    public String generate_token(String id , String email , String userName){
        Map <String , Object> claims = new HashMap<>();
        claims.put("id",id);
        claims.put("email",email);
        claims.put("userName",userName);


        return Jwts.builder()
                .setClaims(claims)
                .setSubject(email)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 60 * 60 * 1000)) // 60 min
                .signWith(SignatureAlgorithm.HS256, SECRET)
                .compact();
    }

    public Claims validate_token(String token) throws ExpiredJwtException {
        return Jwts.parser()
                .setSigningKey(SECRET)
                .parseClaimsJws(token)
                .getBody();
    }
}

