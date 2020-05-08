--
-- PostgreSQL database dump
--

-- Dumped from database version 12.2
-- Dumped by pg_dump version 12.2

-- Started on 2020-05-07 14:37:29

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 202 (class 1259 OID 16385)
-- Name: breed; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.breed (
    code text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.breed OWNER TO postgres;

--
-- TOC entry 203 (class 1259 OID 16396)
-- Name: breed_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.breed ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.breed_id_seq
    START WITH 1111
    INCREMENT BY 2
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 204 (class 1259 OID 16420)
-- Name: media; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.media (
    breed integer NOT NULL,
    path text NOT NULL,
    type text NOT NULL,
    id integer NOT NULL
);


ALTER TABLE public.media OWNER TO postgres;

--
-- TOC entry 205 (class 1259 OID 16435)
-- Name: media_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.media ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.media_id_seq
    START WITH 1
    INCREMENT BY 5
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 2931 (class 0 OID 16385)
-- Dependencies: 202
-- Data for Name: breed; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.breed (code, id) FROM stdin;
testone	1113
testtwo	1115
\.


--
-- TOC entry 2933 (class 0 OID 16420)
-- Dependencies: 204
-- Data for Name: media; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.media (breed, path, type, id) FROM stdin;
1113	affenpinscher/n02110627_10185.jpg	image	1
1113	affenpinscher/somethingelse.jpg	image	2
1115	affenpinscher/anotherone.jpg	image	3
\.


--
-- TOC entry 2940 (class 0 OID 0)
-- Dependencies: 203
-- Name: breed_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.breed_id_seq', 1115, true);


--
-- TOC entry 2941 (class 0 OID 0)
-- Dependencies: 205
-- Name: media_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.media_id_seq', 1, false);


--
-- TOC entry 2801 (class 2606 OID 16429)
-- Name: breed breed_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.breed
    ADD CONSTRAINT breed_pkey PRIMARY KEY (id);


--
-- TOC entry 2803 (class 2606 OID 16427)
-- Name: media media_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT media_pkey PRIMARY KEY (id);


--
-- TOC entry 2804 (class 2606 OID 16430)
-- Name: media breed_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.media
    ADD CONSTRAINT breed_fk FOREIGN KEY (breed) REFERENCES public.breed(id) NOT VALID;


-- Completed on 2020-05-07 14:37:29

--
-- PostgreSQL database dump complete
--

