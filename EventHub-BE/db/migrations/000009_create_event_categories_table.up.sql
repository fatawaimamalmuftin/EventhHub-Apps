CREATE TABLE event_categories (
    event_id INT NOT NULL,
    category_id INT NOT NULL,

    PRIMARY KEY (event_id, category_id),

    CONSTRAINT fk_event_categories_event FOREIGN KEY (event_id) REFERENCES events(id_event),

    CONSTRAINT fk_event_categories_category FOREIGN KEY (category_id) REFERENCES categories(id_categories)
);