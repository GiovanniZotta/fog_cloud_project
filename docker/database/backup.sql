--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-05-18 19:08:59

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

--
-- TOC entry 2 (class 3079 OID 767526)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 2840 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

--
-- TOC entry 198 (class 1259 OID 783919)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(256) NOT NULL,
    description character varying(512),
    image character varying(512),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 783910)
-- Name: review; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.review (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    title character varying(64) NOT NULL,
    body character varying(256),
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    product_id uuid NOT NULL
);


ALTER TABLE public.review OWNER TO postgres;

--
-- TOC entry 2834 (class 0 OID 783919)
-- Dependencies: 198
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, image, created_at, updated_at) FROM stdin;
\.


--
-- TOC entry 2833 (class 0 OID 783910)
-- Dependencies: 197
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id, title, body, created_at, updated_at, product_id) FROM stdin;
\.


--
-- TOC entry 2707 (class 2606 OID 783917)
-- Name: review PK_2e4299a343a81574217255c00ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY (id);


--
-- TOC entry 2710 (class 2606 OID 783929)
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- TOC entry 2705 (class 1259 OID 783918)
-- Name: IDX_2e4299a343a81574217255c00c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_2e4299a343a81574217255c00c" ON public.review USING btree (id);


--
-- TOC entry 2708 (class 1259 OID 783930)
-- Name: IDX_bebc9158e480b949565b4dc7a8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_bebc9158e480b949565b4dc7a8" ON public.product USING btree (id);


--
-- TOC entry 2711 (class 2606 OID 783931)
-- Name: review FK_26b533e15b5f2334c96339a1f08; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY (product_id) REFERENCES public.product(id);


-- Completed on 2021-05-18 19:09:00

--
-- PostgreSQL database dump complete
--

