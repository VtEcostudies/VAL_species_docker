curl -w "\n" \
       -X PUT \
       -d "taxonId=1&scientificName=Animalia&taxonRank=kingdom" \
       localhost:3000/taxa
