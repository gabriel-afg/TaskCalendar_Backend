<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>
</p>

## Description

This project is an API built using NestJs, PrismaORM, PostgreSQL as the database.

## Installation
1. Clone the repository:

```bash
git clone https://github.com/gabriel-afg/TaskCalendar_Backend.git
```

2. Install dependencies 
```bash
pnpm install
```

3. Initialize the container in docker
```bash
docker compose up -d
```


## Running the app

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```

## Test

```bash
# unit tests
$ pnpm run test

# e2e tests
$ pnpm run test:e2e

# test coverage
$ pnpm run test:cov
```

## Documentation

```bash
# Swagger-ui-endpoint

$ http://localhost:3030/api
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](LICENSE).

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request to the repository.
