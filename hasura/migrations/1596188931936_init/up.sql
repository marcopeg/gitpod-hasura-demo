CREATE TABLE public.todos (
    id SERIAL NOT NULL PRIMARY KEY,
    text text NOT NULL,
    completed boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


