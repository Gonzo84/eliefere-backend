module.exports = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: process.env.DB_PORT || 5432,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE_NAME || 'eliefre',
  synchronize: true,
  logging: true,
  entities: [
    'dist/**/*.entity.js',
  ],
  migrations: [
    'dist/database/migrations/**/*.js',
  ],
  subscribers: [
    'dist/database/subscriber/**/.js',
  ],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'database/migrations',
    subscribersDir: 'database/subscriber',
  },
};
