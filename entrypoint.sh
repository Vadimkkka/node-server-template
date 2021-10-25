#!/bin/sh

set -e

cmd="$@"

>&2 echo "!!!!!!!! Check db for available !!!!!!!!"

sleep 10
npx prisma migrate dev --name init
# npx prisma db seed

>&2 echo "db is up - executing command"

exec $cmd
