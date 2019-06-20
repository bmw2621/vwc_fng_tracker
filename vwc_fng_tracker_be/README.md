# Vets Who Code #
## FNG Tracker Application ##
An application to track VWC applicant status

The entire back-end of this application is a docker instance of [Dgraph](https://dgraph.io/),
to keep things simple.

DGraph is an open-source graph database that uses a variant of GraphQL,
known as [GraphQL+](https://docs.dgraph.io/query-language). Since all queries can
be made directly via http to the Dgraph server, we have no need of any backend
application code.

This requires Docker and Docker-Compaose to be installed on the developer's machine.
To start the server, from this directory, run the following command:
```
docker-compose up -d
```

To stop the server, from this directory, run:
```
docker-compose down
```

Queries are performed via http-requests on `http://localhost:8181`

