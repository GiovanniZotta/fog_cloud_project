--
-- PostgreSQL database dump
--

-- Dumped from database version 11.2
-- Dumped by pg_dump version 13.2

-- Started on 2021-05-26 14:11:51

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
-- TOC entry 199 (class 1259 OID 792102)
-- Name: inventory; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.inventory (
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL,
    product_id uuid NOT NULL,
    weight integer NOT NULL,
    price integer NOT NULL,
    quantity integer NOT NULL,
    CONSTRAINT "CHK_54a1f9e7e254543a5336b8dab6" CHECK ((weight > 0)),
    CONSTRAINT "CHK_57c6a3eb67500d319c5716e02c" CHECK ((quantity >= 0)),
    CONSTRAINT "CHK_a803e868f33f38065e4fe15d22" CHECK ((price > 0))
);


ALTER TABLE public.inventory OWNER TO postgres;

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
-- TOC entry 2850 (class 0 OID 792102)
-- Dependencies: 199
-- Data for Name: inventory; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.inventory (created_at, updated_at, product_id, weight, price, quantity) FROM stdin;
2021-05-26 13:04:43.114364+02	2021-05-26 13:04:43.114364+02	5be865bf-4905-411e-bd6f-d9f2bb2d443b	500	99900	0
2021-05-26 13:04:43.114364+02	2021-05-26 13:04:43.114364+02	9536fa61-eef9-4c82-b9dd-27db8cc94e33	1500	5500	7
2021-05-26 13:04:43.114364+02	2021-05-26 13:04:43.114364+02	d353bdc9-4268-48f8-9350-525335c964d5	233	4999	98
2021-05-26 13:04:43.114364+02	2021-05-26 13:04:43.114364+02	e7828093-9c67-455a-8ef2-96fcdb4aff51	25000	199900	1
2021-05-26 13:04:43.114364+02	2021-05-26 13:04:43.114364+02	fcaee1ae-46f6-4fe9-8b93-882d1fae15b1	750	999	43
\.


--
-- TOC entry 2849 (class 0 OID 783919)
-- Dependencies: 198
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, description, image, created_at, updated_at) FROM stdin;
9536fa61-eef9-4c82-b9dd-27db8cc94e33	LEGO Ideas Saturn V Apollo NASA	Razzo Spaziale con Veicoli, Set di Costruzioni per Collezionisti di Astronavi con Espositore	https://images-na.ssl-images-amazon.com/images/I/81J40Ja0bCL._AC_SL1500_.jpg	2021-05-19 17:02:11.146433+02	2021-05-19 17:02:11.146433+02
5be865bf-4905-411e-bd6f-d9f2bb2d443b	MSI GeForce RTX 3090 GAMING X TRIO	\N	https://images-na.ssl-images-amazon.com/images/I/81f6GdD799L._AC_SL1500_.jpg	2021-05-19 17:03:39.117385+02	2021-05-19 17:03:39.117385+02
fcaee1ae-46f6-4fe9-8b93-882d1fae15b1	1984	Ediz. integrale. Con Segnalibro	https://m.media-amazon.com/images/P/B08QYY4G59.01._SCLZZZZZZZ_SX500_.jpg	2021-05-19 17:05:14.526367+02	2021-05-19 17:05:14.526367+02
d353bdc9-4268-48f8-9350-525335c964d5	Fire TV Stick 4K Ultra HD	Telecomando vocale Alexa di ultima generazione	\N	2021-05-19 17:06:07.373794+02	2021-05-19 17:06:07.373794+02
e7828093-9c67-455a-8ef2-96fcdb4aff51	LG OLED83C14LB Smart TV 4K 83"	TV OLED Serie C1 2021 con Processore α9 Gen4, Dolby Vision IQ, Wi-Fi, webOS 6.0, FILMMAKER MODE, Google Assistant e Alexa Integrati, 4 HDMI 2.1, Telecomando Puntatore [Classe di efficienza energetica G]	https://images-na.ssl-images-amazon.com/images/I/81ggHsFZD3L._AC_SL1500_.jpg	2021-05-19 17:07:29.56834+02	2021-05-19 17:07:29.56834+02
\.


--
-- TOC entry 2848 (class 0 OID 783910)
-- Dependencies: 197
-- Data for Name: review; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.review (id, title, body, created_at, updated_at, product_id) FROM stdin;
aed7ba93-e741-4eb4-a925-55b4a431c180	To the moon	Grazie a questo razzo sono riuscito ad acquistare dei Dogecoin	2021-05-19 17:08:37.617028+02	2021-05-19 17:08:37.617028+02	9536fa61-eef9-4c82-b9dd-27db8cc94e33
d4a6cdee-b19c-4db6-9e4f-53caf92ef5ac	LEGO immancabile	\N	2021-05-19 17:09:50.435842+02	2021-05-19 17:09:50.435842+02	9536fa61-eef9-4c82-b9dd-27db8cc94e33
9e560ebd-7677-4787-aff1-47895a9ed586	Se solo fosse disponibile	Il prodotto con ventole al 100% funziona meglio di un ventilatore	2021-05-19 17:11:09.017639+02	2021-05-19 17:11:09.017639+02	5be865bf-4905-411e-bd6f-d9f2bb2d443b
53b5c07b-3c9b-45b6-9bed-45aad3712335	Ottimo libro	Un libro immancabile per la mia collezione	2021-05-19 17:12:21.27007+02	2021-05-19 17:12:21.27007+02	fcaee1ae-46f6-4fe9-8b93-882d1fae15b1
6eebf7f1-7545-4d6e-bdae-303b6bc0f25a	Complottismi ovunque	\N	2021-05-19 17:13:11.018699+02	2021-05-19 17:13:11.018699+02	fcaee1ae-46f6-4fe9-8b93-882d1fae15b1
25747e3f-7202-4dd3-be44-9f7561f63e90	Il mio assistente personale	Immancabile in ogni parte della mia casa	2021-05-19 17:14:42.187855+02	2021-05-19 17:14:42.187855+02	d353bdc9-4268-48f8-9350-525335c964d5
b7234e2b-7d14-46b7-91ed-c0de81212c77	Ti spia	Il microfono e' sempre acceso. La nostra privacy oramai non esiste piu'. Rivoglio i miei dati personali	2021-05-19 17:14:42.187855+02	2021-05-19 17:14:42.187855+02	d353bdc9-4268-48f8-9350-525335c964d5
\.


--
-- TOC entry 2716 (class 2606 OID 783917)
-- Name: review PK_2e4299a343a81574217255c00ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "PK_2e4299a343a81574217255c00ca" PRIMARY KEY (id);


--
-- TOC entry 2722 (class 2606 OID 792108)
-- Name: inventory PK_732fdb1f76432d65d2c136340dc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "PK_732fdb1f76432d65d2c136340dc" PRIMARY KEY (product_id);


--
-- TOC entry 2719 (class 2606 OID 783929)
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- TOC entry 2724 (class 2606 OID 792116)
-- Name: inventory UQ_732fdb1f76432d65d2c136340dc; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "UQ_732fdb1f76432d65d2c136340dc" UNIQUE (product_id);


--
-- TOC entry 2714 (class 1259 OID 783918)
-- Name: IDX_2e4299a343a81574217255c00c; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_2e4299a343a81574217255c00c" ON public.review USING btree (id);


--
-- TOC entry 2720 (class 1259 OID 792109)
-- Name: IDX_732fdb1f76432d65d2c136340d; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_732fdb1f76432d65d2c136340d" ON public.inventory USING btree (product_id);


--
-- TOC entry 2717 (class 1259 OID 783930)
-- Name: IDX_bebc9158e480b949565b4dc7a8; Type: INDEX; Schema: public; Owner: postgres
--

CREATE INDEX "IDX_bebc9158e480b949565b4dc7a8" ON public.product USING btree (id);


--
-- TOC entry 2725 (class 2606 OID 783931)
-- Name: review FK_26b533e15b5f2334c96339a1f08; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.review
    ADD CONSTRAINT "FK_26b533e15b5f2334c96339a1f08" FOREIGN KEY (product_id) REFERENCES public.product(id);


--
-- TOC entry 2726 (class 2606 OID 792117)
-- Name: inventory FK_732fdb1f76432d65d2c136340dc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.inventory
    ADD CONSTRAINT "FK_732fdb1f76432d65d2c136340dc" FOREIGN KEY (product_id) REFERENCES public.product(id);


-- Completed on 2021-05-26 14:11:52

--
-- PostgreSQL database dump complete
--

