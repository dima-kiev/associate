package com.itsupportme.associate.common.component.jwt.endpoint;

import com.itsupportme.associate.common.component.jwt.auth.jwt.extractor.TokenExtractor;
import com.itsupportme.associate.common.component.jwt.auth.jwt.verifier.TokenVerifier;
import com.itsupportme.associate.common.component.jwt.config.JwtSettings;
import com.itsupportme.associate.common.component.jwt.config.WebSecurityConfig;
import com.itsupportme.associate.common.component.jwt.exceptions.InvalidJwtToken;
import com.itsupportme.associate.common.component.jwt.exceptions.handle.ErrorHandler;
import com.itsupportme.associate.common.component.jwt.model.token.JwtToken;
import com.itsupportme.associate.common.component.jwt.model.token.JwtTokenFactory;
import com.itsupportme.associate.common.component.jwt.model.token.RawAccessJwtToken;
import com.itsupportme.associate.common.component.jwt.model.token.RefreshToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.MediaType;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@RestController
public class RefreshTokenEndpoint {

    @Autowired
    private JwtTokenFactory tokenFactory;
    @Autowired
    private JwtSettings jwtSettings;
    @Autowired
    private UserDetailsService userService;
    @Autowired
    private TokenVerifier tokenVerifier;
    @Autowired
    private ErrorHandler errorHandler;

    @Autowired
    @Qualifier("jwtHeaderTokenExtractor")
    private TokenExtractor tokenExtractor;
    
    @RequestMapping(value="/api/auth/token", method=RequestMethod.GET, produces={ MediaType.APPLICATION_JSON_VALUE })
    public @ResponseBody
    JwtToken refreshToken(HttpServletRequest request) throws IOException, ServletException {
        String tokenPayload = tokenExtractor.extract(request.getHeader(WebSecurityConfig.JWT_TOKEN_HEADER_PARAM));
        
        RawAccessJwtToken rawToken = new RawAccessJwtToken(tokenPayload);
        RefreshToken refreshToken = RefreshToken
                                        .create(rawToken, jwtSettings.getTokenSigningKey())
                                        .orElseThrow(() -> new InvalidJwtToken(new Throwable()));

        String jti = refreshToken.getJti();
        if (!tokenVerifier.verify(jti)) {
            throw new InvalidJwtToken(new Throwable());
        }

        String subject = refreshToken.getSubject();
        UserDetails userDetails = userService.loadUserByUsername(subject);

        return tokenFactory.createAccessJwtToken(userDetails);
    }

    @ExceptionHandler(Exception.class)
    public void handle(HttpServletResponse response, Exception ex) throws IOException {
        errorHandler.handle(response, ex);
    }
}
