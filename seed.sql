--
-- PostgreSQL database dump
--

-- Dumped from database version 11.3 (Ubuntu 11.3-1.pgdg18.04+1)
-- Dumped by pg_dump version 11.5

-- Started on 2019-09-11 16:56:10 PDT

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

CREATE TABLE public.users (
	"_id" serial NOT NULL,
	"name" varchar NOT NULL,
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"age" integer,
	"gender" varchar,
	"num_of_classes_joined" integer,
	"status" varchar,
	CONSTRAINT "users_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

CREATE TABLE public.groups (
	"_id" serial NOT NULL,
	"subject" varchar NOT NULL,
	"categories" varchar NOT NULL,
	"descriptions" varchar NOT NULL,
	"rules" varchar NOT NULL,
	"courselinks" varchar,
	"size" integer NOT NULL,
	"sunday" varchar,
	"monday" varchar,
	"tuesday" varchar,
	"wednesday" varchar,
	"thursday" varchar,
	"friday" varchar,
	"saturday" varchar,
	"host_id" bigint NOT NULL,
	CONSTRAINT "groups_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);


CREATE TABLE public.messages_in_group (
	"_id" serial NOT NULL,
	"group_id" bigint NOT NULL,
	"user_id" bigint NOT NULL,
	"messages" varchar NOT NULL,
	CONSTRAINT "species_in_films_pk" PRIMARY KEY ("_id")
) WITH (
  OIDS=FALSE
);

ALTER TABLE public.groups ADD CONSTRAINT "groups_fk0" FOREIGN KEY ("host_id") REFERENCES  public.users("_id");

ALTER TABLE  public.messages_in_group ADD CONSTRAINT "messages_in_group_fk0" FOREIGN KEY ("user_id") REFERENCES public.users("_id");
ALTER TABLE  public.messages_in_group ADD CONSTRAINT "messages_in_group_fk1" FOREIGN KEY ("group_id") REFERENCES  public.groups("_id");


INSERT INTO public.users VALUES (1, 'Luis', 'luis@gmail.com', 'password', 31, 'Male', 1, 'Senior');
INSERT INTO public.users VALUES (2, 'Fiona', 'fiona@gmail.com', 'password', 27, 'Female', 1, 'Newbie');
INSERT INTO public.users VALUES (3, 'Jim', 'jim@gmail.com', 'password', 23, 'Male', 1, 'Leader');
INSERT INTO public.users VALUES (4, 'Mercer', 'mercer@gmail.com', 'password', 20, 'Male', 1, 'God mode');
 

INSERT INTO public.groups VALUES (1, 'Algorithms', 'Computer Science', 'CS50 from Harvard', 'Just do not ditch', 'http://harvard.edu', 4, '09:00-17:00', '09:00-19:00','09:00-19:00','09:00-19:00','09:00-19:00','09:00-19:00','Not available', 1);
INSERT INTO public.groups VALUES (2, 'UI Design', 'Digital Arts', 'UX design on Udemy', 'Just do not ditch', 'http://udemy.com', 3, '09:00-17:00', '09:00-19:00','09:00-19:00','09:00-19:00','09:00-19:00','09:00-19:00','Not available', 2);
INSERT INTO public.groups VALUES (3, 'React', 'Computer Science', 'Colt Steele React Course on Udemy', 'Just do not ditch', 'http://udemy.com', 2, '09:00-17:00', '09:00-19:00','09:00-19:00','09:00-19:00','09:00-19:00','09:00-19:00','Not available', 1);
INSERT INTO public.groups VALUES (4, 'Express', 'Computer Science', 'Just Express on Udemy', 'Just do not ditch', 'http://udemy.com', 3, '09:00-17:00', '09:00-19:00','09:00-19:00','09:00-19:00','09:00-19:00','09:00-19:00','Not available', 2);


INSERT INTO public.messages_in_group VALUES (1, 1, 1, 'Hi from Luis in Algorithms');
INSERT INTO public.messages_in_group VALUES (2, 1, 2, 'Hi from Fiona in Algorithms');
INSERT INTO public.messages_in_group VALUES (3, 1, 3, 'Hi from Jim in Algorithms');
INSERT INTO public.messages_in_group VALUES (4, 1, 4, 'Hi from Mercer in Algorithms');
INSERT INTO public.messages_in_group VALUES (5, 2, 1, 'Hi from Luis in UI Design');
INSERT INTO public.messages_in_group VALUES (6, 2, 2, 'Hi from Fiona in UI Design');
INSERT INTO public.messages_in_group VALUES (7, 2, 3, 'Hi from Jim in UI Design');
INSERT INTO public.messages_in_group VALUES (8, 3, 2, 'Hi from Fiona in React');
INSERT INTO public.messages_in_group VALUES (9, 3, 3, 'Hi from Jim in React');
INSERT INTO public.messages_in_group VALUES (10, 4, 1, 'Hi from Luis in Express');
INSERT INTO public.messages_in_group VALUES (11, 4, 4, 'Hi from Mercer in Express');

select setval('public.users__id_seq', 5, false);
select setval('public.groups__id_seq', 5, false);
select setval('public.messages_in_group__id_seq', 12, false);