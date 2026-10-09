CREATE TABLE testimonials (
    id_testimonial INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    text TEXT NOT NULL,
    users_id INT NOT NULL,

    CONSTRAINT fk_testimonials_user FOREIGN KEY (users_id) REFERENCES users(id_users)
);