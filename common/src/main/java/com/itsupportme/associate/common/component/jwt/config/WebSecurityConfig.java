package com.itsupportme.associate.common.component.jwt.config;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.itsupportme.associate.common.component.jwt.filter.CORSFilter;
import com.itsupportme.associate.common.component.jwt.auth.ajax.AjaxLoginProcessingFilter;
import com.itsupportme.associate.common.component.jwt.exceptions.handle.ErrorHandler;
import com.itsupportme.associate.common.component.jwt.auth.JwtAccessDeniedHandler;
import com.itsupportme.associate.common.component.jwt.auth.jwt.JwtAuthenticationProvider;
import com.itsupportme.associate.common.component.jwt.RestAuthenticationEntryPoint;
import com.itsupportme.associate.common.component.jwt.auth.ajax.AjaxAuthenticationProvider;
import com.itsupportme.associate.common.component.jwt.auth.jwt.JwtTokenAuthenticationProcessingFilter;
import com.itsupportme.associate.common.component.jwt.auth.jwt.SkipPathAndMethodsRequestMatcher;
import com.itsupportme.associate.common.component.jwt.auth.jwt.extractor.TokenExtractor;
import com.itsupportme.associate.entity.component.security.Role;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    public static final String JWT_TOKEN_HEADER_PARAM                   = "X-Authorization";
    public static final String TOKEN_BASED_AUTH_ENTRY_POINT             = "/api/**";
    public static final String TOKEN_BASED_AUTH_ENTRY_INTERNAL_POINT    = "/api/internal/**";
    public static final String TOKEN_BASED_AUTH_ENTRY_EXTERNAL_POINT    = "/api/external/**";
    public static final String TOKEN_REFRESH_ENTRY_POINT                = "/api/auth/token";
    public static final String FORM_BASED_LOGIN_ENTRY_POINT             = "/api/auth/login";


    @Autowired private AccessControlSettings        accessControlSettings;
    @Autowired private JwtAccessDeniedHandler       apiAccessDeniedHandler;
    @Autowired private RestAuthenticationEntryPoint authenticationEntryPoint;
    @Autowired private AjaxAuthenticationProvider   ajaxAuthenticationProvider;
    @Autowired private JwtAuthenticationProvider    jwtAuthenticationProvider;
    @Autowired private AuthenticationManager        authenticationManager;
    @Autowired private AuthenticationSuccessHandler successHandler;
    @Autowired private ErrorHandler                 errorHandler;
    @Autowired private TokenExtractor               tokenExtractor;

    @Autowired
    @Qualifier("jwtObjectMapper")
    private ObjectMapper objectMapper;

    @Override
    protected void configure(HttpSecurity http) throws Exception {

         http
                .addFilterBefore(
                        new CORSFilter(
                                accessControlSettings.getAccessControlAllowOrigin(),
                                accessControlSettings.getAccessControlAllowMethods(),
                                accessControlSettings.getAccessControlMaxAge(),
                                accessControlSettings.getAccessControlAllowHeaders()
                        ),
                        UsernamePasswordAuthenticationFilter.class
                )
                .csrf()
                    .disable() // We don't need CSRF for JWT based authentication
                .exceptionHandling()
                    .accessDeniedHandler(apiAccessDeniedHandler)
                    .authenticationEntryPoint(this.authenticationEntryPoint)
                .and()
                    .sessionManagement()
                    .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()
                        .antMatchers(FORM_BASED_LOGIN_ENTRY_POINT).permitAll() // Login end-point
                        .antMatchers(TOKEN_REFRESH_ENTRY_POINT).permitAll() // Token refresh end-point
                .and()
                    .authorizeRequests() // Protected API
                        .antMatchers(HttpMethod.OPTIONS, "/**").permitAll()
                        .antMatchers(TOKEN_BASED_AUTH_ENTRY_INTERNAL_POINT).access(Role.ROLE_API_INTERNAL.hasRole())
                        .antMatchers(TOKEN_BASED_AUTH_ENTRY_EXTERNAL_POINT).access(Role.ROLE_API_EXTERNAL.hasRole())
                .and()
                    .addFilterBefore(buildAjaxLoginProcessingFilter(), UsernamePasswordAuthenticationFilter.class)
                    .addFilterBefore(buildJwtTokenAuthenticationProcessingFilter(), UsernamePasswordAuthenticationFilter.class);
    }

    protected void configure(AuthenticationManagerBuilder auth) {
        auth.authenticationProvider(ajaxAuthenticationProvider);
        auth.authenticationProvider(jwtAuthenticationProvider);
    }

    @Bean
    protected BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }

    @Bean
    protected JwtTokenAuthenticationProcessingFilter buildJwtTokenAuthenticationProcessingFilter() throws Exception {
        List<String> pathsToSkip   = Arrays.asList(TOKEN_REFRESH_ENTRY_POINT, FORM_BASED_LOGIN_ENTRY_POINT);
        List<String> methodsToSkip = Collections.singletonList(HttpMethod.OPTIONS.name());

        SkipPathAndMethodsRequestMatcher matcher
                = new SkipPathAndMethodsRequestMatcher(pathsToSkip, methodsToSkip, TOKEN_BASED_AUTH_ENTRY_POINT);

        JwtTokenAuthenticationProcessingFilter filter
                = new JwtTokenAuthenticationProcessingFilter(errorHandler, tokenExtractor, matcher);

        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }

    @Bean
    protected AjaxLoginProcessingFilter buildAjaxLoginProcessingFilter() throws Exception {
        AjaxLoginProcessingFilter filter = new AjaxLoginProcessingFilter(FORM_BASED_LOGIN_ENTRY_POINT, successHandler,
                errorHandler, objectMapper);
        filter.setAuthenticationManager(this.authenticationManager);
        return filter;
    }
}
