CREATE TABLE community (
    id_community INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(150) NOT NULL,
    images TEXT,
    description TEXT,
    users_id INT,

    CONSTRAINT fk_community_user FOREIGN KEY (users_id) REFERENCES users(id_users)
);