package opp.CookBooked.controller;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationFailureHandler;

import java.io.IOException;
import java.io.PrintWriter;

public class CustomAuthenticationFailureHandler extends SimpleUrlAuthenticationFailureHandler {

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException, ServletException, ServletException, IOException {

        response.setStatus(400);
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setContentType("text/plain");

        // Get PrintWriter from HttpServletResponse
        PrintWriter out = response.getWriter();

        // Write to the response body
        out.println("Bad credentials!");
    }
}