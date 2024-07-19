--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

-- Started on 2024-07-19 09:11:39

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
-- TOC entry 218 (class 1259 OID 16579)
-- Name: protection_status; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.protection_status (
    id integer NOT NULL,
    user_id integer,
    is_active boolean DEFAULT true,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.protection_status OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16578)
-- Name: protection_status_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.protection_status_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.protection_status_id_seq OWNER TO postgres;

--
-- TOC entry 4895 (class 0 OID 0)
-- Dependencies: 217
-- Name: protection_status_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.protection_status_id_seq OWNED BY public.protection_status.id;


--
-- TOC entry 224 (class 1259 OID 16619)
-- Name: recent_activity; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recent_activity (
    id integer NOT NULL,
    user_id integer,
    activity_type character varying(100) NOT NULL,
    activity_description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.recent_activity OWNER TO postgres;

--
-- TOC entry 223 (class 1259 OID 16618)
-- Name: recent_activity_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recent_activity_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.recent_activity_id_seq OWNER TO postgres;

--
-- TOC entry 4896 (class 0 OID 0)
-- Dependencies: 223
-- Name: recent_activity_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recent_activity_id_seq OWNED BY public.recent_activity.id;


--
-- TOC entry 222 (class 1259 OID 16606)
-- Name: threats_blocked; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.threats_blocked (
    id integer NOT NULL,
    user_id integer,
    date date NOT NULL,
    threats_count integer NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.threats_blocked OWNER TO postgres;

--
-- TOC entry 221 (class 1259 OID 16605)
-- Name: threats_blocked_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.threats_blocked_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.threats_blocked_id_seq OWNER TO postgres;

--
-- TOC entry 4897 (class 0 OID 0)
-- Dependencies: 221
-- Name: threats_blocked_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.threats_blocked_id_seq OWNED BY public.threats_blocked.id;


--
-- TOC entry 220 (class 1259 OID 16593)
-- Name: traffic_data; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.traffic_data (
    id integer NOT NULL,
    user_id integer,
    date date NOT NULL,
    traffic_amount double precision NOT NULL,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.traffic_data OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16592)
-- Name: traffic_data_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.traffic_data_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.traffic_data_id_seq OWNER TO postgres;

--
-- TOC entry 4898 (class 0 OID 0)
-- Dependencies: 219
-- Name: traffic_data_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.traffic_data_id_seq OWNED BY public.traffic_data.id;


--
-- TOC entry 216 (class 1259 OID 16567)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    hashed_password character varying(100) NOT NULL,
    is_active boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    email_verification_token character varying(255),
    email_verification_token_expires timestamp with time zone
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 215 (class 1259 OID 16566)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_id_seq OWNER TO postgres;

--
-- TOC entry 4899 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_id_seq OWNED BY public.users.id;


--
-- TOC entry 4712 (class 2604 OID 16582)
-- Name: protection_status id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.protection_status ALTER COLUMN id SET DEFAULT nextval('public.protection_status_id_seq'::regclass);


--
-- TOC entry 4719 (class 2604 OID 16622)
-- Name: recent_activity id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recent_activity ALTER COLUMN id SET DEFAULT nextval('public.recent_activity_id_seq'::regclass);


--
-- TOC entry 4717 (class 2604 OID 16609)
-- Name: threats_blocked id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.threats_blocked ALTER COLUMN id SET DEFAULT nextval('public.threats_blocked_id_seq'::regclass);


--
-- TOC entry 4715 (class 2604 OID 16596)
-- Name: traffic_data id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_data ALTER COLUMN id SET DEFAULT nextval('public.traffic_data_id_seq'::regclass);


--
-- TOC entry 4708 (class 2604 OID 16570)
-- Name: users id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN id SET DEFAULT nextval('public.users_id_seq'::regclass);


--
-- TOC entry 4883 (class 0 OID 16579)
-- Dependencies: 218
-- Data for Name: protection_status; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.protection_status (id, user_id, is_active, updated_at) FROM stdin;
\.


--
-- TOC entry 4889 (class 0 OID 16619)
-- Dependencies: 224
-- Data for Name: recent_activity; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recent_activity (id, user_id, activity_type, activity_description, created_at) FROM stdin;
\.


--
-- TOC entry 4887 (class 0 OID 16606)
-- Dependencies: 222
-- Data for Name: threats_blocked; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.threats_blocked (id, user_id, date, threats_count, created_at) FROM stdin;
\.


--
-- TOC entry 4885 (class 0 OID 16593)
-- Dependencies: 220
-- Data for Name: traffic_data; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.traffic_data (id, user_id, date, traffic_amount, created_at) FROM stdin;
\.


--
-- TOC entry 4881 (class 0 OID 16567)
-- Dependencies: 216
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, name, email, hashed_password, is_active, created_at, updated_at, email_verification_token, email_verification_token_expires) FROM stdin;
\.


--
-- TOC entry 4900 (class 0 OID 0)
-- Dependencies: 217
-- Name: protection_status_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.protection_status_id_seq', 1, false);


--
-- TOC entry 4901 (class 0 OID 0)
-- Dependencies: 223
-- Name: recent_activity_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recent_activity_id_seq', 1, false);


--
-- TOC entry 4902 (class 0 OID 0)
-- Dependencies: 221
-- Name: threats_blocked_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.threats_blocked_id_seq', 1, false);


--
-- TOC entry 4903 (class 0 OID 0)
-- Dependencies: 219
-- Name: traffic_data_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.traffic_data_id_seq', 1, false);


--
-- TOC entry 4904 (class 0 OID 0)
-- Dependencies: 215
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 16, true);


--
-- TOC entry 4726 (class 2606 OID 16586)
-- Name: protection_status protection_status_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.protection_status
    ADD CONSTRAINT protection_status_pkey PRIMARY KEY (id);


--
-- TOC entry 4732 (class 2606 OID 16627)
-- Name: recent_activity recent_activity_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recent_activity
    ADD CONSTRAINT recent_activity_pkey PRIMARY KEY (id);


--
-- TOC entry 4730 (class 2606 OID 16612)
-- Name: threats_blocked threats_blocked_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.threats_blocked
    ADD CONSTRAINT threats_blocked_pkey PRIMARY KEY (id);


--
-- TOC entry 4728 (class 2606 OID 16599)
-- Name: traffic_data traffic_data_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_data
    ADD CONSTRAINT traffic_data_pkey PRIMARY KEY (id);


--
-- TOC entry 4722 (class 2606 OID 16577)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4724 (class 2606 OID 16575)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 4733 (class 2606 OID 16587)
-- Name: protection_status protection_status_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.protection_status
    ADD CONSTRAINT protection_status_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4736 (class 2606 OID 16628)
-- Name: recent_activity recent_activity_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recent_activity
    ADD CONSTRAINT recent_activity_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4735 (class 2606 OID 16613)
-- Name: threats_blocked threats_blocked_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.threats_blocked
    ADD CONSTRAINT threats_blocked_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


--
-- TOC entry 4734 (class 2606 OID 16600)
-- Name: traffic_data traffic_data_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.traffic_data
    ADD CONSTRAINT traffic_data_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(id);


-- Completed on 2024-07-19 09:11:39

--
-- PostgreSQL database dump complete
--

