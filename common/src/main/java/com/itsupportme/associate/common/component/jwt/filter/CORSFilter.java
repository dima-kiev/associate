package com.itsupportme.associate.common.component.jwt.filter;


import javax.servlet.*;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


public class CORSFilter implements Filter {

    private String accessControlAllowOrigin;
    private String accessControlAllowMethods;
    private String accessControlMaxAge;
    private String accessControlAllowHeaders;

    public CORSFilter(String accessControlAllowOrigin, String accessControlAllowMethods,
                      String accessControlMaxAge, String accessControlAllowHeaders) {

        this.accessControlAllowOrigin  = accessControlAllowOrigin;
        this.accessControlAllowMethods = accessControlAllowMethods;
        this.accessControlMaxAge       = accessControlMaxAge;
        this.accessControlAllowHeaders = accessControlAllowHeaders;
    }

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse res, FilterChain chain) throws IOException, ServletException {
        HttpServletResponse response = (HttpServletResponse) res;
        response.setHeader("Access-Control-Allow-Origin", accessControlAllowOrigin);
        response.setHeader("Access-Control-Allow-Methods", accessControlAllowMethods);
        response.setHeader("Access-Control-Max-Age", accessControlMaxAge);
        response.setHeader("Access-Control-Allow-Headers", accessControlAllowHeaders);
        chain.doFilter(request, response);
    }

    public void destroy() {}
}

