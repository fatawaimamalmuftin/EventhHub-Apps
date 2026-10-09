CREATE TABLE notifications (
    id_notification INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    description TEXT,
    time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    type type_icon NOT NULL,
    read_at TIMESTAMP,
    users_id INT NOT NULL,

    CONSTRAINT fk_notifications_user FOREIGN KEY (users_id) REFERENCES users(id_users)
);