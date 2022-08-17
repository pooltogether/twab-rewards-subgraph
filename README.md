<p align="center">
  <a href="https://github.com/pooltogether/pooltogether--brand-assets">
    <img src="https://github.com/pooltogether/pooltogether--brand-assets/blob/977e03604c49c63314450b5d432fe57d34747c66/logo/pooltogether-logo--purple-gradient.png?raw=true" alt="PoolTogether Brand" style="max-width:100%;" width="200">
  </a>
</p>

<br />

## PoolTogether - TWAB Rewards subgraph

[![Tests](https://github.com/pooltogether/twab-rewards-subgraph/actions/workflows/main.yml/badge.svg)](https://github.com/pooltogether/twab-rewards-subgraph/actions/workflows/main.yml)

Subgraph to track events and data related to the TWAB Rewards contract.

## Development

### Templates

Generate subgraph templates using one of the following commands.

Mainnet:
```
yarn prepare:mainnet
yarn prepare:polygon
yarn prepare:avalanche
```

Testnet:
```
yarn prepare:goerli
yarn prepare:mumbai
yarn prepare:fuji
yarn prepare:optimism-kovan
```

### Schemas

Generate schemas using one of the following commands.

Mainnet:
```
yarn gen:mainnet
yarn gen:polygon
yarn gen:avalanche
```

Testnet:
```
yarn gen:goerli
yarn gen:mumbai
yarn gen:fuji
yarn gen:optimism-kovan
```

### Tests

Run tests with the command: `yarn test`

## Deployment

### Deploy

Deploy using one of the following commands.

Mainnet:
```
yarn deploy:mainnet
yarn deploy:polygon
yarn deploy:avalanche
```

Testnet:
```
yarn deploy:goerli
yarn deploy:mumbai
yarn deploy:fuji
yarn deploy:optimism-kovan
```

### Build and deploy

To build and deploy at once, use one of the following commands:

Mainnet:
```
yarn all-mainnet
yarn all-polygon
yarn all-avalanche
```

Testnet:
```
yarn all-goerli
yarn all-mumbai
yarn all-fuji
yarn all-optimism-kovan
```

### Hosted Subgraphs

Subgraphs are hosted at the following URLs.

Mainnet:
- https://thegraph.com/hosted-service/subgraph/pooltogether/mainnet-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/polygon-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/avalanche-twab-rewards

Testnet:
- https://thegraph.com/hosted-service/subgraph/pooltogether/goerli-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/mumbai-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/fuji-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/optimism-kovan-twab-rewards
