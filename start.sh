set -e
set -o allexport
source .env
set +o allexport

yarn prisma generate
yarn run-p next:dev prisma:watch gql:codegen