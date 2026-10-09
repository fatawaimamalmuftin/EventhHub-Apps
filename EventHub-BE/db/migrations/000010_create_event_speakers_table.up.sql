CREATE TABLE event_speakers (
    event_id INT NOT NULL,
    speaker_id INT NOT NULL,

    PRIMARY KEY (event_id, speaker_id),

    CONSTRAINT fk_event_speakers_event FOREIGN KEY (event_id) REFERENCES events(id_event),

    CONSTRAINT fk_event_speakers_speaker FOREIGN KEY (speaker_id) REFERENCES speaker(id_speaker)
);