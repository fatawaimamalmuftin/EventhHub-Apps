CREATE TABLE event_discussion (
    id_discuss INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    message TEXT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    event_id INT NOT NULL,
    user_id INT NOT NULL,

    CONSTRAINT fk_event_discussion_event FOREIGN KEY (event_id) REFERENCES events(id_event),

    CONSTRAINT fk_event_discussion_user FOREIGN KEY (user_id) REFERENCES users(id_users)
);