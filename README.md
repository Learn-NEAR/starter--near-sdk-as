# `near-sdk-as` Starter Kit

This is a good project to use as a starting point for your AssemblyScript project.

## Samples

This repository includes a complete project structure for AssemblyScript contracts targeting the NEAR platform.

The example here is very basic.  It's a simple contract demonstrating the following concepts:
- a single contract
- the difference between `view` vs. `change` methods
- basic contract storage

There are 2 AssemblyScript contracts in this project, each in their own folder:

- **simple** in the `src/simple` folder
- **singleton** in the `src/singleton` folder

### Simple

We say that an AssemblyScript contract is written in the "simple style" when the `index.ts` file (the contract entry point) includes a series of exported functions.

In this case, all exported functions become public contract methods.

```ts
// return the string 'hello world'
export function helloWorld(): string {}

// read the given key from account (contract) storage
export function read(key: string): string {}

// write the given value at the given key to account (contract) storage
export function write(key: string, value: string): string {}

// private helper method used by read() and write() above
private storageReport(): string {}
```

### Singleton

We say that an AssemblyScript contract is written in the "singleton style" when the `index.ts` file (the contract entry point) has a single exported class (the name of the class doesn't matter) that is decorated with `@nearBindgen`.

In this case, all methods on the class become public contract methods unless marked `private`.  Also, all instance variables are stored as a serialized instance of the class under a special storage key named `STATE`.  AssemblyScript uses JSON for storage serialization (as opposed to Rust contracts which use a custom binary serialization format called borsh).

```ts
@nearBindgen
export class Contract {

  // return the string 'hello world'
  helloWorld(): string {}

  // read the given key from account (contract) storage
  read(key: string): string {}

  // write the given value at the given key to account (contract) storage
  @mutateState()
  write(key: string, value: string): string {}

  // private helper method used by read() and write() above
  private storageReport(): string {}
}
```


## Usage

### Getting started

(see below for video recordings of each of the following steps)

INSTALL `NEAR CLI` first like this: `npm i -g near-cli`

1. clone this repo to a local folder
2. run `yarn`
3. run `./scripts/1.dev-deploy.sh`
3. run `./scripts/2.use-contract.sh`
4. run `./scripts/2.use-contract.sh` (yes, run it to see changes)
5. run `./scripts/3.cleanup.sh`

### Videos

**`1.dev-deploy.sh`**

This video shows the build and deployment of the contract.

[![asciicast](https://asciinema.org/a/409575.svg)](https://asciinema.org/a/409575)

**`2.use-contract.sh`**

This video shows contract methods being called.  You should run the script twice to see the effect it has on contract state.

[![asciicast](https://asciinema.org/a/409577.svg)](https://asciinema.org/a/409577)

**`3.cleanup.sh`**

This video shows the cleanup script running.  Make sure you add the `BENEFICIARY` environment variable. The script will remind you if you forget.

```sh
export BENEFICIARY=<your-account-here>   # this account receives contract account balance
```

[![asciicast](https://asciinema.org/a/409580.svg)](https://asciinema.org/a/409580)

### Other documentation

- See `./scripts/README.md` for documentation about the scripts
- Watch this video where Willem Wyndham walks us through refactoring a simple example of a NEAR smart contract written in AssemblyScript

  https://youtu.be/QP7aveSqRPo

  ```
  There are 2 "styles" of implementing AssemblyScript NEAR contracts:
  - the contract interface can either be a collection of exported functions
  - or the contract interface can be the methods of a an exported class

  We call the second style "Singleton" because there is only one instance of the class which is serialized to the blockchain storage.  Rust contracts written for NEAR do this by default with the contract struct.

   0:00 noise (to cut)
   0:10 Welcome
   0:59 Create project starting with "npm init"
   2:20 Customize the project for AssemblyScript development
   9:25 Import the Counter example and get unit tests passing
  18:30 Adapt the Counter example to a Singleton style contract
  21:49 Refactoring unit tests to access the new methods
  24:45 Review and summary
  ```

## The file system

```sh
├── README.md                          # this file
├── as-pect.config.js                  # configuration for as-pect (AssemblyScript unit testing)
├── asconfig.json                      # configuration for AssemblyScript compiler (supports multiple contracts)
├── package.json                       # NodeJS project manifest
├── scripts
│   ├── 1.dev-deploy.sh                # helper: build and deploy contracts
│   ├── 2.use-contract.sh              # helper: call methods on ContractPromise
│   ├── 3.cleanup.sh                   # helper: delete build and deploy artifacts
│   └── README.md                      # documentation for helper scripts
├── src
│   ├── as_types.d.ts                  # AssemblyScript headers for type hints
│   ├── simple                         # Contract 1: "Simple example"
│   │   ├── __tests__
│   │   │   ├── as-pect.d.ts           # as-pect unit testing headers for type hints
│   │   │   └── index.unit.spec.ts     # unit tests for contract 1
│   │   ├── asconfig.json              # configuration for AssemblyScript compiler (one per contract)
│   │   └── assembly
│   │       └── index.ts               # contract code for contract 1
│   ├── singleton                      # Contract 2: "Singleton-style example"
│   │   ├── __tests__
│   │   │   ├── as-pect.d.ts           # as-pect unit testing headers for type hints
│   │   │   └── index.unit.spec.ts     # unit tests for contract 2
│   │   ├── asconfig.json              # configuration for AssemblyScript compiler (one per contract)
│   │   └── assembly
│   │       └── index.ts               # contract code for contract 2
│   ├── tsconfig.json                  # Typescript configuration
│   └── utils.ts                       # common contract utility functions
└── yarn.lock                          # project manifest version lock
```

You may clone this repo to get started OR create everything from scratch.

Please note that, in order to create the AssemblyScript and tests folder structure, you may use the command `asp --init` which will create the following folders and files:

```
./assembly/
./assembly/tests/
./assembly/tests/example.spec.ts
./assembly/tests/as-pect.d.ts
```
