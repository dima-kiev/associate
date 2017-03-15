package com.itsupportme.associate.api.controller.root;


import com.itsupportme.associate.common.component.jwt.exceptions.AuthMethodNotSupportedException;
import com.itsupportme.associate.entity.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/api")
public class LogoutController {

    @Autowired
    private UserRepository userRepository;

    @ResponseBody
    @RequestMapping(path = "/logout", method = RequestMethod.GET)
    @Transactional
    public Integer logout() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        Integer user = userRepository.setFixedRefreshTokenUIDFor(username, null);
        if (user == 0) {
            throw new AuthMethodNotSupportedException("error");
        }
        return user;
    }
}
