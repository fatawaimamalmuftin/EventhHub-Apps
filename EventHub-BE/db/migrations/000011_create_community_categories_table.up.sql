CREATE TABLE community_categories (
    community_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (community_id, category_id),

    CONSTRAINT fk_community_categories_community FOREIGN KEY (community_id) REFERENCES community(id_community),

    CONSTRAINT fk_community_categories_category FOREIGN KEY (category_id) REFERENCES categories(id_categories)
);