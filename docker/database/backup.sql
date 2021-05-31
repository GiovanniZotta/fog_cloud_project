--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-05-31 14:53:29

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
-- TOC entry 2856 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


SET default_tablespace = '';

--
-- TOC entry 199 (class 1259 OID 800370)
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    quantity integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    product_id uuid NOT NULL,
    CONSTRAINT "CHK_57c6a3eb67500d319c5716e02c" CHECK ((quantity >= 0))
);


ALTER TABLE public.inventory OWNER TO postgres;

--
-- TOC entry 198 (class 1259 OID 800356)
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id uuid DEFAULT public.uuid_generate_v4() NOT NULL,
    name character varying(256) NOT NULL,
    description character varying(512),
    image character varying(512),
    weight integer NOT NULL,
    price integer NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT "CHK_a244786c001e8ae2f75cd60109" CHECK ((weight > 0)),
    CONSTRAINT "CHK_dfa05ac382975a36460b98fd0e" CHECK ((price > 0))
);


ALTER TABLE public.product OWNER TO postgres;

--
-- TOC entry 197 (class 1259 OID 800347)
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
-- TOC entry 2850 (class 0 OID 800370)
-- Dependencies: 199
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory (quantity, created_at, updated_at, product_id) FROM stdin;
0	2021-05-31 14:44:49.35438+02	2021-05-31 14:44:49.35438+02	5be865bf-4905-411e-bd6f-d9f2bb2d443b
7	2021-05-31 14:44:49.35438+02	2021-05-31 14:44:49.35438+02	9536fa61-eef9-4c82-b9dd-27db8cc94e33
98	2021-05-31 14:44:49.35438+02	2021-05-31 14:44:49.35438+02	d353bdc9-4268-48f8-9350-525335c964d5
1	2021-05-31 14:44:49.35438+02	2021-05-31 14:44:49.35438+02	e7828093-9c67-455a-8ef2-96fcdb4aff51
43	2021-05-31 14:44:49.35438+02	2021-05-31 14:44:49.35438+02	fcaee1ae-46f6-4fe9-8b93-882d1fae15b1
\.


--
-- TOC entry 2849 (class 0 OID 800356)
-- Dependencies: 198
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, image, weight, price, created_at, updated_at) FROM stdin;
9536fa61-eef9-4c82-b9dd-27db8cc94e33	LEGO Ideas Saturn V Apollo NASA\tRazzo Spaziale con Veicoli	Set di Costruzioni per Collezionisti di Astronavi con Espositore	https://images-na.ssl-images-amazon.com/images/I/81J40Ja0bCL._AC_SL1500_.jpg	1500	5500	2021-05-31 14:43:59.821308+02	2021-05-31 14:43:59.821308+02
5be865bf-4905-411e-bd6f-d9f2bb2d443b	MSI GeForce RTX 3090 GAMING X TRIO	\N	https://images-na.ssl-images-amazon.com/images/I/81f6GdD799L._AC_SL1500_.jpg	500	99900	2021-05-31 14:43:59.821308+02	2021-05-31 14:43:59.821308+02
fcaee1ae-46f6-4fe9-8b93-882d1fae15b1	1984	Ediz. integrale. Con Segnalibro	https://m.media-amazon.com/images/P/B08QYY4G59.01._SCLZZZZZZZ_SX500_.jpg	750	999	2021-05-31 14:43:59.821308+02	2021-05-31 14:43:59.821308+02
d353bdc9-4268-48f8-9350-525335c964d5	Fire TV Stick 4K Ultra HD	Telecomando vocale Alexa di ultima generazione	\N	233	4999	2021-05-31 14:43:59.821308+02	2021-05-31 14:43:59.821308+02
e7828093-9c67-455a-8ef2-96fcdb4aff51	LG OLED83C14LB Smart TV 4K 83"	TV OLED Serie C1 2021 con Processore α9 Gen4, Dolby Vision IQ, Wi-Fi, webOS 6.0, FILMMAKER MODE, Google Assistant e Alexa Integrati, 4 HDMI 2.1, Telecomando Puntatore [Classe di efficienza energetica G]	https://images-na.ssl-images-amazon.com/images/I/81ggHsFZD3L._AC_SL1500_.jpg	25000	199900	2021-05-31 14:43:59.821308+02	2021-05-31 14:43:59.821308+02
\.


--
-- TOC entry 2848 (class 0 OID 800347)
-- Dependencies: 197
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id, title, body, created_at, updated_at, product_id) FROM stdin;
aed7ba93-e741-4eb4-a925-55b4a431c180	To the moon	Grazie a questo razzo sono riuscito ad acquistare dei Dogecoin	2021-05-31 14:49:11.853502+02	2021-05-31 14:49:11.853502+02	9536fa61-eef9-4c82-b9dd-27db8cc94e33
cd8c0a3e-3ca7-4186-8648-cca430cdaa1f	LEGO immancabile	\N	2021-05-31 14:49:11.853502+02	2021-05-31 14:49:11.853502+02	9536fa61-eef9-4c82-b9dd-27db8cc94e33
ecfbe3d1-c31f-413a-9957-d4115ebd6895	Se solo fosse disponibile	Il prodotto con ventole al 100% funziona meglio di un ventilatore	2021-05-31 14:49:11.853502+02	2021-05-31 14:49:11.853502+02	5be865bf-4905-411e-bd6f-d9f2bb2d443b
a9bf065f-1b0c-4252-bcf5-84b1c11ea38d	Ottimo libro	Un libro immancabile per la mia collezione	2021-05-31 14:49:11.853502+02	2021-05-31 14:49:11.853502+02	fcaee1ae-46f6-4fe9-8b93-882d1fae15b1
11b12643-1eed-466e-b47b-e4bac85ecc46	Complottismi ovunque	\N	2021-05-31 14:49:11.853502+02	2021-05-31 14:49:11.853502+02	fcaee1ae-46f6-4fe9-8b93-882d1fae15b1
b3af253b-0684-462a-9afb-a4e1fd665206	Il mio assistente personale	Immancabile in ogni parte della mia casa	2021-05-31 14:49:11.853502+02	2021-05-31 14:49:11.853502+02	d353bdc9-4268-48f8-9350-525335c964d5
9e0870e8-7a00-4569-997d-322b39f5a626	Ti spia	Il microfono e' sempre acceso. La nostra privacy oramai non esiste piu'. Rivoglio i miei dati personali	2021-05-31 14:49:11.853502+02	2021-05-31 14:49:11.853502+02	d353bdc9-4268-48f8-9350-525335c964d5
\.


--
-- TOC entry 2716 (class 2606 OID 800354)
-- Name: review PK_2e4299a343a81574217255c00ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY (id);


--
-- TOC entry 2722 (class 2606 OID 800377)
-- Name: inventory PK_732fdb1f76432d65d2c136340dc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "PK_732fdb1f76432d65d2c136340dc" PRIMARY KEY (product_id);


--
-- TOC entry 2719 (class 2606 OID 800368)
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- TOC entry 2724 (class 2606 OID 800390)
-- Name: inventory UQ_732fdb1f76432d65d2c136340dc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "UQ_732fdb1f76432d65d2c136340dc" UNIQUE (product_id);


--
-- TOC entry 2714 (class 1259 OID 800355)
-- Name: IDX_2e4299a343a81574217255c00c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_2e4299a343a81574217255c00c" ON public.review USING btree (id);


--
-- TOC entry 2720 (class 1259 OID 800378)
-- Name: IDX_732fdb1f76432d65d2c136340d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_732fdb1f76432d65d2c136340d" ON public.inventory USING btree (product_id);


--
-- TOC entry 2717 (class 1259 OID 800369)
-- Name: IDX_bebc9158e480b949565b4dc7a8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_bebc9158e480b949565b4dc7a8" ON public.product USING btree (id);


--
-- TOC entry 2725 (class 2606 OID 800379)
-- Name: review FK_26b533e15b5f2334c96339a1f08; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- TOC entry 2726 (class 2606 OID 800391)
-- Name: inventory FK_732fdb1f76432d65d2c136340dc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" FOREIGN KEY (product_id) REFERENCES public.product(id) ON UPDATE CASCADE ON DELETE CASCADE;


-- Completed on 2021-05-31 14:53:31

--
-- PostgreSQL database dump complete
--

