TRUNCATE todos;

INSERT INTO todos
(id, text)
VALUES
(1, 'Buy milk'),
(2, 'Do laundry'),
(3, 'Call mom');

ALTER SEQUENCE todos_id_seq RESTART WITH 4;
