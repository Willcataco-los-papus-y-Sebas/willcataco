# Willcataco

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.0.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Linting and formatting

Run ESLint to check code quality:

```bash
npm run lint
```

Format the codebase with Prettier:

```bash
npm run format
```

## Environment configuration

Environment files live under [src/environments](src/environments). The Angular build picks the file based on the `--configuration` flag:

- `dev` → [src/environments/environment.dev.ts](src/environments/environment.dev.ts)
- `development` → [src/environments/environment.development.ts](src/environments/environment.development.ts)
- `production` → [src/environments/environment.ts](src/environments/environment.ts)

Example for a local dev run:

```bash
ng serve --configuration dev
```

### .env files

Use [.env.example](.env.example) as a template:

```bash
cp .env.example .env
```

The file defines `NG_ENV`, which maps to the Angular configuration values above. Valid options: `dev`, `development`, `production`.

## Docker

The app ships with a multi-stage Dockerfile that builds the Angular app and serves it with Nginx.

1. Prepare the env file (defaults to production if unset):

   ```bash
   cp .env.example .env
   # edit NG_ENV=development|dev|production
   ```

2. Build and run:

   ```bash
   docker compose up --build
   ```

   The container exposes port 80, mapped to host 8080 by default (see [docker-compose.yml](docker-compose.yml)).

Rebuild if you change `NG_ENV` or dependencies.

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
