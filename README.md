## Install

Flow CLI

https://developers.flow.com/tooling/flow-cli/install

For setting up a new account on any network, there are different addresses on different networks .

```
flow accounts create
```

## Deploy smart contracts

Fix flow.json
and then hit

```
flow project deploy -n testnet
```

## Run transactions

flow transactions send cadence/transactions/set-foo.cdc "Harsh figured something" -n testnet --signer <WALLET-NAME-Mentioned in FLOW.json>

## Run scripts

flow scripts execute cadence/scripts/get-foo.cdc -n testnet
