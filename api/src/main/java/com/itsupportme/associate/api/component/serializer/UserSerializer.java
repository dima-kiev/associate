package com.itsupportme.associate.api.component.serializer;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.itsupportme.associate.entity.entity.User;

import java.io.IOException;

public class UserSerializer extends StdSerializer<User> {

    public UserSerializer(Class<User> t) {
        super(t);
    }

    public UserSerializer() {
        this(null);
    }

    @Override
    public void serialize(User value, JsonGenerator jgen, SerializerProvider provider) throws IOException {
        jgen.writeStartObject();
        jgen.writeObjectField("id", value.getId());
        jgen.writeObjectField("first", value.getFirst());
        jgen.writeObjectField("last", value.getLast());
        jgen.writeObjectField("username", value.getUsername());
        jgen.writeObjectField("isEnabled", value.getIsEnabled());
        jgen.writeEndObject();
    }
}
