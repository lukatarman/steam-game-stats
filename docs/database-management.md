# Database Management

## Workflow

- test all db opertations (queries, aggregations, deletions, etc.) in your local mongodb instance before deploying them in the cloud
- for critical operations like deletions in the cloud:
  - first create a backup
  - restore the backup in your local instance in a new db
  - test critical operation locally in the new db
  - then perform the operation in the cloud
  - cleanup locally if needed

## Backup and Restore

Currently database backups are done manually via the terminal.

Install MongoDB tools as explained here: [link](https://www.mongodb.com/docs/database-tools/installation/installation-macos/).

### Backup

```bash
# cloud
mongodump --uri mongodb+srv://<username>:<password>@<host>/<database> -o <path>

# local
mongodump --uri mongodb://localhost:27017/<database> -o <path>
```

### Restore

```bash
# cloud
mongorestore -d <db-to-restore-into> --uri mongodb+srv://<username>:<password>@<host>/<database> <path>

# local
mongorestore -d <db-to-restore-into> --uri mongodb://localhost:27017/ <path-to-backup>
```
