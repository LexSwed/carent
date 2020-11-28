set -e
set -o allexport
source .env
set +o allexport

. ./.env && yarn prisma:migrate
yarn prisma generate
npx npm-run-all -p next:dev prisma:watch gql:codegen