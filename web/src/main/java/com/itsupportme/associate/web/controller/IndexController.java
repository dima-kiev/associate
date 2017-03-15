package com.itsupportme.associate.web.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {

    @Value("${app.base_url}")
    private String baseUrl;

    @RequestMapping(value = "/")
    public String login(Model model) {

        model.addAttribute("baseUrl", baseUrl);

        return "index";
    }
}
