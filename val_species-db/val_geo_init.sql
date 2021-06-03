CREATE TYPE type_val_geo_ent AS ENUM ('survey_block', 'town', 'county', 'state', 'biophysical', 'river', 'road', 'other');

create table val_geo_ent (
	"ent_id" SERIAL,
	"ent_type" type_val_geo_ent NOT NULL default 'other',
	"ent_name" TEXT NOT NULL,
	CONSTRAINT geo_ent_pkey PRIMARY KEY ("ent_id"),
	UNIQUE("ent_type", "ent_name")
);
INSERT INTO val_geo_ent ("ent_id", "ent_type", "ent_name")
VALUES 
(1, 'state','Vermont'),
(2, 'river', 'Connecticut');

create table val_geo (
	"geo_id" integer NOT NULL,
	"geo_polygon" geometry(Geometry, 4326),
	CONSTRAINT geo_pkey PRIMARY KEY ("geo_id"),
	CONSTRAINT fk_geo_ent_id FOREIGN KEY ("geo_id") REFERENCES val_geo_ent ("ent_id")
);
