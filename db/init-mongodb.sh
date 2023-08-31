set -e

mongo <<EOF
db = db.getSiblingDB('$MONGO_INITDB_DATABASE')

db.createUser({
  user: '$DB_USERNAME',
  pwd: '$DB_PASSWORD',
  roles: [{ role: 'readWrite', db: '$MONGO_INITDB_DATABASE' }],
});

EOF