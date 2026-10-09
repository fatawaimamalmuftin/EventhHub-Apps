CREATE TABLE community_members (
    community_id INT NOT NULL,
    users_id INT NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY (community_id, users_id),

    CONSTRAINT fk_community_members_community FOREIGN KEY (community_id) REFERENCES community(id_community),

    CONSTRAINT fk_community_members_user FOREIGN KEY (users_id) REFERENCES users(id_users)
);