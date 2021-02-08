set -e
set -o allexport
source .env
set +o allexport

yarn prisma generate
npx npm-run-all -p next:dev prisma:watch gql:codegen