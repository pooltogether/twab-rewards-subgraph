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
yarn prepare:optimism
```

Testnet:
```
yarn prepare:goerli
yarn prepare:mumbai
yarn prepare:fuji
yarn prepare:optimism-goerli
yarn prepare:arbitrum-goerli
```

### Schemas

Generate schemas using one of the following commands.

Mainnet:
```
yarn gen:mainnet
yarn gen:polygon
yarn gen:avalanche
yarn gen:optimism
```

Testnet:
```
yarn gen:goerli
yarn gen:mumbai
yarn gen:fuji
yarn gen:optimism-goerli
yarn gen:arbitrum-goerli
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
yarn deploy:optimism
```

Testnet:
```
yarn deploy:goerli
yarn deploy:mumbai
yarn deploy:fuji
yarn deploy:optimism-goerli
yarn deploy:arbitrum-goerli
```

### Build and deploy

To build and deploy at once, use one of the following commands:

Mainnet:
```
yarn all-mainnet
yarn all-polygon
yarn all-avalanche
yarn all-optimism
```

Testnet:
```
yarn all-goerli
yarn all-mumbai
yarn all-fuji
yarn all-optimism-goerli
yarn all-arbitrum-goerli
```

### Hosted Subgraphs

Subgraphs are hosted at the following URLs.

Mainnet:
- https://thegraph.com/hosted-service/subgraph/pooltogether/mainnet-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/polygon-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/avalanche-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/optimism-twab-rewards

Testnet:
- https://thegraph.com/hosted-service/subgraph/pooltogether/goerli-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/mumbai-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/fuji-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/optimism-goerli-twab-rewards
- https://thegraph.com/hosted-service/subgraph/pooltogether/arbitrum-goerli-twab-rewards
