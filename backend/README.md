# Steam Game Stats Backend

## Project Structure

The backend is stuctured following hexagonal architecture as outlined by its creator Alistar Cockburn. The main high level parts are:

- `core/ =>` application business logic, it has no dependencies to the outside exept to `common`
  - `features/ =>` the actual core functionality of steam game stats is here
  - `models/ =>` data model
  - `repositories/ =>` persistence concerns for the data model
  - `services/ =>` services for the data model
- `common/ =>` common/shared utilities which have no dependencies to `core`, `adapters` or `main.js` but are imported and injected liberaly in `core` and `adapters`
- `adapters/`
  - `driven/ =>` http-, db-client adapters are _driven_ by the core i.e. injected into cores classes and used by them
  - `driving/ =>` rest-api, runner adapters _drive_ the core i.e. are dependend on cores classes and are calling their functions directly
- `main.js =>` entry point which depends on everything, instantiates everything and starts the application

## Diagram

tba

## Resources

- [Alistar Cockburn - Hexagonal Architecture](https://codesoapbox.dev/ports-adapters-aka-hexagonal-architecture-explained/)
- [Hexagonal Architecture Explained](https://codesoapbox.dev/ports-adapters-aka-hexagonal-architecture-explained/)
