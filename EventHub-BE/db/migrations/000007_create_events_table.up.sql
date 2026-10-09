CREATE TABLE events (
    id_event INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    images TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    location VARCHAR(255),
    attendees INT NOT NULL DEFAULT 0,
    capacity INT NOT NULL,
    description TEXT,
    event_format event_format NOT NULL DEFAULT 'in person',
    community_id INT NOT NULL,

    CONSTRAINT fk_event_community FOREIGN KEY (community_id) REFERENCES community(id_community),

    CONSTRAINT check_event_attendees CHECK (attendees >= 0),
    CONSTRAINT check_event_capacity CHECK (capacity > 0),
    CONSTRAINT check_event_attendees_capacity CHECK (attendees <= capacity),
    CONSTRAINT check_event_time CHECK (start_time < end_time)
);