# ELiefere
 is an online platform which should help Users with day to day problems regarding delivery of all kinds of goods in a time and money efficient way.

## Features

Server, db and redis are in Docker containers 

1. **PostgreSQL with TypeORM**

2. **JWT Authentication**

3. **Mail Verification**

4. **Mail Change**

5. **Password Reset**

6. **Request Validation**

7. **Customizable Mail Templates**

8. **Swagger API Documentation**

9. **Security Techniques**

10. **Logger**

## Getting Started

### Installation

1. Make sure that you have [Node.js](https://nodejs.org)(>= 8.9.0) installed.
2. Clone this repository by running `git clone https://github.com/Gonzo84/eliefere-backend <YOUR_PROJECT_NAME>`.
3. Move to the appropriate directory: `cd <YOUR_PROJECT_NAME>`.
4. Run `yarn` to install dependencies.

### Configuration Files

#### [TypeORM](https://github.com/typeorm/typeorm) Configurations

This template uses Postgres by default. If you want to use another database, follow instructions in the [official Nest documentation](https://docs.nestjs.com/techniques/database) and use appropriate [column types](https://github.com/typeorm/typeorm/blob/master/src/driver/types/ColumnTypes.ts) for your entities.

Enter your database configurations to [`ormconfig.js`](ormconfig.js).

```js
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

```

#### JWT Configurations

A secret key is needed in encryption process. Generate a secret key using a service like [randomkeygen](https://randomkeygen.com/).

Enter your secret key to `.env` file. You can also the change expiration time in `config.js` file, default is 86400 seconds(1 day).

```dotenv
PORT=3000
DB_PASSWORD=postgres
DB_USERNAME=postgres
DB_DATABASE_NAME=eliefere
DB_HOST=postgres
DB_PORT=5432
JWT_SECRET=m==?8AG"Ik^str0}qxS_4Q%lsb~DUK
```

#### [NodeMailer✉️](https://github.com/nodemailer/nodemailer) Configurations

A delivery provider is required for sending mails with Nodemailer. I mostly use [SendGrid](https://sendgrid.com) to send mails, however, Nodemailer can work with any service with SMTP transport.

To get a SendGrid API key:

- Create a free account from [https://signup.sendgrid.com/](https://signup.sendgrid.com/)
- Confirm your account via the activation email and login.
- Create an API Key with mail sending capability.

Enter your API key and sender credentials to `.env` file. Sender credentials are the sender name and sender mail in `config.js` file that will be seen by your users.

```dotenv
SENDGRID_API_KEY=your_api_key
```

#### Mail Template Configurations

Mail templates are highly customizable and heavily depend on configurations. Enter your project's information to [`config.ts`](src/config.ts). Urls are used as references in the templates. If your mail verification logic is independent from your front-end application, you can use API's own mail verification endpoint, e.g. `http://localhost:3000/auth/verify`, as `mailVerificationUrl`. Otherwise, send a HTTP `GET` request to verification endpoint with token added as a parameter named token, e.g, `http://localhost:3000/auth/verify?token=__VERIFICATION_TOKEN__`

```js
 project: {
    name: '__YOUR_PROJECT_NAME__',
    address: '__YOUR_PROJECT_ADDRESS__',
    logoUrl: 'https://__YOUR_PROJECT_LOGO_URL__',
    slogan: 'Made with ❤️ in Istanbul',
    color: '#123456',
    // You can enter as many social links as you want
    socials: [
      ['GitHub', '__Project_GitHub_URL__'],
      ['__Social_Media_1__', '__Social_Media_1_URL__'],
      ['__Social_Media_2__', '__Social_Media_2_URL__'],
    ],
    url: 'http://localhost:4200',
    mailVerificationUrl: 'http://localhost:3000/auth/verify',
    mailChangeUrl: 'http://localhost:3000/auth/change-email',
    resetPasswordUrl: 'http://localhost:4200/reset-password',
    termsOfServiceUrl: 'http://localhost:4200/legal/terms',
  },
```

### Running the app

Create `.env` file and copy in to that file content of `.env.dist` file

```bash
$ docker-compose up
```

### Running the tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```

### Debugging

1. Comment out main service in `docker-compose.yml` file
2. In `ormcofig.yml` file change host from `postgres` to `localhost` 
3. Start `docker-compose up --build -V` and `nest start --debug --watch` commands
4. Open `chrome://inspect` and attache/select remote target
5. Happy deugging


### TODO 

1. export env variables (**solved**)
2. solve accessing container on heroku 
3. solve accessing db on heroku 
