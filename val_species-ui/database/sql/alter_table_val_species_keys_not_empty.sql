ALTER TABLE val_species
ADD CONSTRAINT val_species_taxon_id_not_empty CHECK ("taxonId" <> '');

ALTER TABLE val_species
ADD CONSTRAINT val_species_scientific_name_not_empty CHECK ("scientificName" <> '');

ALTER TABLE val_species
ADD CONSTRAINT val_species_accepted_name_id_not_empty CHECK ("acceptedNameUsageId" <> '');

ALTER TABLE val_species
ADD CONSTRAINT val_species_accepted_name_not_empty CHECK ("acceptedNameUsage" <> '');

ALTER TABLE val_species
ADD CONSTRAINT val_species_taxon_status_not_empty CHECK ("taxonomicStatus" <> '');
