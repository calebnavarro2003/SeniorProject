package com.calebnavarro2003.learnos.learnos_backend.Config;

import com.calebnavarro2003.learnos.learnos_backend.Model.User;
import com.calebnavarro2003.learnos.learnos_backend.Service.JwtUtils;
import com.calebnavarro2003.learnos.learnos_backend.Service.OurUserDetailsService;
import com.calebnavarro2003.learnos.learnos_backend.Service.UserManagementService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

import java.io.IOException;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    @Autowired
    private OurUserDetailsService ourUserDetailsService;

    @Autowired
    UserManagementService userManagementService;

    @Autowired
    JwtUtils jwtUtils;

    @Autowired
    private JWTAuthFilter jwtAuthFilter;

    @Value("${frontend.url}")
    private String frontendUrl;

    @Value("${frontend.user.dash}")
    private String userDashUrl;

    @Value("${frontend.admin.dash}")
    private String adminDashUrl;

    @Bean
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .authorizeHttpRequests(authorizeRequests ->
                        authorizeRequests
                        .requestMatchers(
                            "/oauth2/**",
                            "/login/**",
                            "/public/**",
                            "/auth/**",
                            "/module/summary",     
                            "/module/update" // ← add this
                        ).permitAll()
                        // admin paths stay locked down
                        .requestMatchers("/admin/**").hasAuthority("ADMIN")
                        // everything else requires login
                        .requestMatchers("/module/**").permitAll()

                        .anyRequest().authenticated()
                    )
                .sessionManagement(manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2Login(oauth2 -> oauth2
                        .successHandler(this::onAuthenticationSuccess)
                )
                .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    private void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication
    ) throws IOException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        User user = userManagementService.processOAuth2User(oAuth2User);
        String jwt = jwtUtils.generateToken(user);

        // Build Set-Cookie header manually to include SameSite=None
        StringBuilder sb = new StringBuilder();
        sb.append("jwt=").append(jwt)
                .append("; Path=/")
                .append("; HttpOnly")
                .append("; Secure");

        // Optionally set domain if needed:
        // sb.append("; Domain=learnos-backend-7453408282.us-central1.run.app");
        sb.append("; Max-Age=").append(60 * 60 * 24);

        response.addHeader("Set-Cookie", sb.toString());

        // redirect to frontend
        boolean isAdmin = user.getAuthorities().stream()
                .anyMatch(a -> a.getAuthority().equals("ADMIN"));

        String target = isAdmin
                ? adminDashUrl
                : userDashUrl;

        response.sendRedirect(target);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(frontendUrl));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);

        return source;
    }

    @Bean
    public CorsFilter corsFilter() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowCredentials(true);
        corsConfiguration.addAllowedOrigin(frontendUrl);
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.addAllowedMethod("*");

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration);

        return new CorsFilter(source);
    }
}