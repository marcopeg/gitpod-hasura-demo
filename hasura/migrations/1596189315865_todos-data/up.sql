INSERT INTO todos
(id, text)
VALUES
(1, 'buy milk'),
(2, 'do laundry'),
(3, 'call mom');

ALTER SEQUENCE todos_id_seq RESTART WITH 4;
