package opp.CookBooked.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;
import java.io.PrintWriter;

public class CustomAuthenticationSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException {

        response.setStatus(200);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("text/plain");

        // Get PrintWriter from HttpServletResponse
        PrintWriter out = response.getWriter();

        // Write to the response body
        out.println("Logged in successfully!");
    }
}