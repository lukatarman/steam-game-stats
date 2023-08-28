# Steam Game Stats

"Steam Game Stats" project monorepo. Frontend and backend readme files can be found in:

- [frontend/README.md](frontend/README.md)
- [backend/README.md](backend/README.md)

## Development Setup

For development and testing the application locally use the Docker Compose setup. Either connect to a MongoDB running in a container or to a remote MongoDB instance. See details below on how to do that.

**Step 1.**, install:

- [Node.js v18.17.x](https://nodejs.org/download/release/v18.17.1/).
- [Docker Desktop](https://www.docker.com/products/docker-desktop/).
- [VSCode](https://code.visualstudio.com/) or any other code editor.
- [MongoDB extension](https://www.mongodb.com/products/vs-code) to test your queries if you use VSCode.

**Step 2.**:

- check out code from this repo

**Step 3.1**, local setup:

- For the local db setup create a `local-db.env` in the root folder in the `config` directory:

```bash
# ./config/local-db.env
DB_ENDPOINT="mongodb://mongodb:27017"
DB_USERNAME="<local-db-username>"                # pick a username
DB_PASSWORD="<local-db-password>"                # generate using: openssl rand -base64 16
DB_NAME="<local-db-name>"                        # pick a db name
DB_AUTH_ON="true"

MONGO_INITDB_ROOT_USERNAME="root"
MONGO_INITDB_ROOT_PASSWORD="<local-db-password>" # generate using: openssl rand -base64 16
MONGO_INITDB_DATABASE="<local-db-name>"          # same as DB_NAME

LOG_LEVEL="debug"

FEATURES_BATCH_SIZE=5
FEATURES_BATCH_DELAY=5000                        # ms
FEATURES_UNIT_DELAY=800                          # ms
FEATURES_CURRENT_PLAYERS_UPDATE_INTERVAL_DELAY=2 # h
FEATURES_UPDATE_INTERVAL_DELAY=12                # h
FEATURES_ITERATION_DELAY=5000                    # ms

RUNNER_ITERATION_DELAY=5000                      # ms
```

**Step 3.2**, cloud setup:

- create a free tier [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register)
- add your IP to the access list in the [MongoDB Atlas dashboard](https://cloud.mongodb.com)
- get the connection uri from the same dashboad under `deployment > database`, then clicking the `connect` button and then `shell`, the uri should look something like this: `mongodb+srv://a-database-name.wml8hrs.mongodb.net/`
- there is a small bug in MongoDB Atlas with the first user which is created when the account is created, so create a second user and use the second user to connect
- store the password in a password manager upon creation of the user otherwise you have to overwrite it
- get the username under `security > database access`
- for the cloud db setup create a `cloud-db.env` in the root folder in the `config` directory:

```bash
# ./config/cloud-db.env
DB_ENDPOINT="<cloud-db-endpoint>"                # set accordingly
DB_USERNAME="<cloud-db-username>"                # set accordingly
DB_PASSWORD="<cloud-db-password>"                # set accordingly
DB_NAME="<cloud-db-name>"                        # set accordingly
DB_AUTH_ON="true"

MONGO_INITDB_ROOT_USERNAME="<unset>"             # not used but must have a value in cloud setup
MONGO_INITDB_ROOT_PASSWORD="<unset>"             # not used but must have a value in cloud setup
MONGO_INITDB_DATABASE="<unset>"                  # not used but must have a value in cloud setup

LOG_LEVEL="debug"

FEATURES_BATCH_SIZE=3
FEATURES_BATCH_DELAY=30000                       # ms
FEATURES_UNIT_DELAY=2000                         # ms
FEATURES_CURRENT_PLAYERS_UPDATE_INTERVAL_DELAY=2 # h
FEATURES_UPDATE_INTERVAL_DELAY=12                # h
FEATURES_ITERATION_DELAY=30000                   # ms

RUNNER_ITERATION_DELAY=30000                     # ms
```

## Running the Application

The Docker Compose setup contains the backend and the database. Adding the frontend to the setup is pending.

Before you start the application the first time you have to build the application image:

```bash
npm run build:backend
```

Whenever you make any changes to the code you need to rebuild the image by running the command above.

Start application using the local db:

```bash
npm run start:backend:local-db
```

Start application using the cloud db:

```bash
npm run start:backend:cloud-db
```

Stop the application (cloud or local):

```bash
npm stop
```

The rest api is exposed under [http://localhost:3000](http://localhost:3000).
