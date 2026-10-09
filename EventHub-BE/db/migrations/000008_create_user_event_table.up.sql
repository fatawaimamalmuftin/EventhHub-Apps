CREATE TABLE user_event (
    users_id INT NOT NULL,
    events_id INT NOT NULL,

    PRIMARY KEY (users_id, events_id),

    CONSTRAINT fk_user_event_user FOREIGN KEY (users_id) REFERENCES users(id_users),

    CONSTRAINT fk_user_event_event FOREIGN KEY (events_id) REFERENCES events(id_event)
);