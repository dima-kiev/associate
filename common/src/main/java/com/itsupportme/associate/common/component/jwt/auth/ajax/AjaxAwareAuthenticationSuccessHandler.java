package com.itsupportme.associate.common.component.jwt.auth.ajax;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itsupportme.associate.common.component.jwt.UserUIDService;
import com.itsupportme.associate.common.component.jwt.model.token.JwtToken;
import com.itsupportme.associate.common.component.jwt.model.token.JwtTokenFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.WebAttributes;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;


@Component
public class AjaxAwareAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    @Qualifier("jwtObjectMapper")
    private ObjectMapper mapper;
    @Autowired
    private JwtTokenFactory tokenFactory;

    @Qualifier("userUIDService")
    @Autowired
    private UserUIDService userUIDService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
            Authentication authentication) throws IOException, ServletException {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String uid = UUID.randomUUID().toString();

        userUIDService.saveRefreshTokenUID(userDetails.getUsername(), uid);

        JwtToken accessToken = tokenFactory.createAccessJwtToken(userDetails);
        JwtToken refreshToken = tokenFactory.createRefreshToken(userDetails, uid);
        
        Map<String, String> tokenMap = new HashMap<>();
        tokenMap.put("token", accessToken.getToken());
        tokenMap.put("refreshToken", refreshToken.getToken());

        response.setStatus(HttpStatus.OK.value());
        response.setContentType(MediaType.APPLICATION_JSON_VALUE);
        mapper.writeValue(response.getWriter(), tokenMap);

        clearAuthenticationAttributes(request);
    }

    /**
     * Removes temporary authentication-related data which may have been stored
     * in the session during the authentication process..
     * 
     */
    protected final void clearAuthenticationAttributes(HttpServletRequest request) {
        HttpSession session = request.getSession(false);

        if (session == null) {
            return;
        }

        session.removeAttribute(WebAttributes.AUTHENTICATION_EXCEPTION);
    }
}
