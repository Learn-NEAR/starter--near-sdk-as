## Setting up your terminal

The scripts in this folder are designed to help you demonstrate the behavior of the contract(s) in this project.

It uses the following setup:

```sh
# set your terminal up to have 2 windows, A and B like this:
┌─────────────────────────────────┬─────────────────────────────────┐
│                                 │                                 │
│                                 │                                 │
│                A                │                B                │
│                                 │                                 │
│                                 │                                 │
└─────────────────────────────────┴─────────────────────────────────┘
```

### Terminal **A**

*This window is used to compile, deploy and control the contract*
- Environment
  ```sh
  export CONTRACT=        # depends on deployment
  export OWNER=           # any account you control

  # for example
  # export CONTRACT=dev-1615190770786-2702449
  # export OWNER=sherif.testnet
  ```

- Commands

  _helper scripts_
  ```sh
  1.dev-deploy.sh                # helper: build and deploy contracts
  2.use-contract.sh              # helper: call methods on ContractPromise
  3.cleanup.sh                   # helper: delete build and deploy artifacts
  ```

### Terminal **B**

*This window is used to render the contract account storage*
- Environment
  ```sh
  export CONTRACT=               # depends on deployment

  # for example
  # export CONTRACT=dev-1615190770786-2702449
  ```

- Commands
  ```sh
  # monitor contract storage using near-account-utils
  # https://github.com/near-examples/near-account-utils
  watch -d -n 1 yarn storage $CONTRACT
  ```
---

## OS Support

### Linux

- The `watch` command is supported natively on Linux
- To learn more about any of these shell commands take a look at [explainshell.com](https://explainshell.com)

### MacOS

- Consider `brew info visionmedia-watch` (or `brew install watch`)

### Windows

- Consider this article: [What is the Windows analog of the Linux watch command?](https://superuser.com/questions/191063/what-is-the-windows-analog-of-the-linuo-watch-command#191068)
