docker-compose down
docker build -t taxonomy .
docker build -t jloomisvce/taxonomy .
docker build -t val_species_docker_taxonomy .
docker-compose up
