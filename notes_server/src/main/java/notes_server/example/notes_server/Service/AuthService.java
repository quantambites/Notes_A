package notes_server.example.notes_server.Service;


import io.jsonwebtoken.Claims;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import notes_server.example.notes_server.JWT.JwtUtil;
import notes_server.example.notes_server.Model.User;
import notes_server.example.notes_server.Repository.UserRepository;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthService {

    public final UserRepository userRepository;
    public final JwtUtil JwtUtil;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    public String register(String userName, String email, String password) throws Exception {
        Optional<User> existing = userRepository.findByEmail(email);
        if (existing.isPresent()) {
            throw new Exception("User already exists!");
        }

        User newUser = User.builder()
                .userName(userName)
                .email(email)
                .password(passwordEncoder.encode(password))
                .build();

        userRepository.save(newUser);
        return "Registration successful";
    }



    public User login(String email, String password, HttpServletResponse response) throws Exception {
        User user = userRepository.findByEmail(email).orElseThrow(() -> new Exception("User not found"));

        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new Exception("Invalid credentials");
        }

        String token = JwtUtil.generate_token(user.getId(), user.getEmail(), user.getUserName());
        ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                //.secure(true)
                //.sameSite("None")
                .path("/")
                .maxAge(7 * 24 * 60 * 60) // 7 days
                .build();

        response.setHeader(HttpHeaders.SET_COOKIE, cookie.toString());
        return user;
    }



    public void logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("token", null);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        response.addCookie(cookie);
    }


    public User check_auth(HttpServletRequest request) throws Exception{
        Optional<Cookie> tokenCookie = Arrays.stream(request.getCookies())
                .filter(c -> c.getName().equals("token"))
                .findFirst();

        if (tokenCookie.isEmpty()) {
            throw new Exception("No cookie found");
        }

        Claims claims = JwtUtil.validate_token(tokenCookie.get().getValue());

        // Rebuild user from claims
        return User.builder()
                .id(claims.get("id", String.class))
                .email(claims.getSubject())
                .userName(claims.get("userName", String.class))
                .build();
    }
}