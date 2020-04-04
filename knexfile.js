// Update with your config settings.
const POSTGRES_USER = process.env.POSTGRES_USER;
const POSTGRES_PASSWORD = process.env.POSTGRES_PASSWORD;
const DATABASE_URL = `postgres://${POSTGRES_USER}:${POSTGRES_PASSWORD}@postgres:5432/node-api-db`;

module.exports = {
  development: {
    client: "pg",
    connection: DATABASE_URL,
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/db/seeds`,
    },
  },

  production: {
    client: "DATABASE_URL",
    connection: DATABASE_URL,
    migrations: {
      directory: `${__dirname}/src/db/migrations`,
    },
    seeds: {
      directory: `${__dirname}/src/db/seeds`,
    },
  },
};
