# Carent

Home schooling project

## Tech that makes this possible:

- Main engine: [Next.js by Vercel](https://nextjs.org/)
- Database toolkit: [Prisma](https://www.prisma.io/)
- GraphQL server and client handlers: [Apollo GraphQL](https://www.apollographql.com/docs/)
- Code first GraphQL schemas: [GraphQL Nexus](https://nexusjs.org/)
- Passwordless Auth: [NextAuth.js](https://next-auth.js.org/)
- Accessible Design System: [React Sectrum Libraries](https://react-spectrum.adobe.com/index.html)
- ofc `React`, `TypeScript`, etc

## Development

Make sure you have all dependencies

```bash
yarn install
```

```bash
cp .env.copy .env
```

Fill in environment variables in `.env`.

### Database

`prisma` connects to the PostgreSQL database, so make sure you have it running, available through `DATABASE_URL` in `.env`.

#### To use database via [`Docker`](https://hub.docker.com/_/postgres))

Start

```bash
docker-compose up --detach
```

## Start the development

You can start the development just by running simple script included in the repo:

```bash
./start.sh
```

It will load environment variables from `.env` file (for `prisma` and `next-auth`), run migrations to database and start two parallel processes: `prisma generate --watch` and `next dev`. Former is used if you intend to make changes to `prisma/schema.prisma` file, it will automatically regenerate the `@prisma/client`. Later spins up `Next.js` dev server.

If you make changes to `prisma/schema.prisma` file, make sure your database has those updates. Use `yarn prisma:migrate` for prisma to create a migration for your database.

If you don't need to work with `schema.prisma`, just comment out a line in `start.sh` with `npx npm-run-all` and add `yarn run dev` below. Make sure you don't commit these changes.
