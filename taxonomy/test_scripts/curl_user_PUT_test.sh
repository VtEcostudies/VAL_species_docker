curl -w "\n" \
       -X PUT \
       -d "email=oscar@thegrouch.org&password=garbage" \
       localhost:3000/users
