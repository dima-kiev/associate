package com.itsupportme.associate.common.component.jwt.auth.jwt.extractor;


public interface TokenExtractor {
    String extract(String payload);
}
