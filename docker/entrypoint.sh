#!/bin/sh

set -e

cmd="$@"

>&2 echo "⚠️ ⚠️ ⚠️  Check DB for available ⚠️ ⚠️ ⚠️"

sleep 10
npx prisma migrate dev --name init
npx prisma db seed

>&2 echo "🚀 DB is up - executing command 🥳"

exec $cmd
