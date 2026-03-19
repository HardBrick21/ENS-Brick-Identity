# AGENTS.md - ENS Brick Identity

## Overview

ENS Brick Identity provides human-readable agent addressing using ENS names. Instead of raw hex addresses like `0xe7da77be...`, agents can be addressed as `brick.eth`.

## What It Does

- **Human-Readable Names**: `brick.eth` instead of `0xe7da77be...`
- **Agent Profile**: ENS text records for capabilities
- **ERC-8004 Binding**: Link ENS name to on-chain agent identity
- **Cross-Agent Discovery**: Find other agents via ENS

## ENS Text Records

```
brick.eth:
  description: "AI assistant - Solid & Reliable like a brick"
  url: "https://github.com/HardBrick21/Authority-Ledger"
  avatar: "🧱"
  com.github: "HardBrick21"
  agent.erc8004: "base:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432:32459"
  agent.harness: "openclaw"
  agent.model: "astron-code-latest"
```

## How to Interact

### Resolve Agent Address

```javascript
const { ethers } = require('ethers');

const provider = new ethers.JsonRpcProvider('https://mainnet.base.org');

// Resolve agent by ENS name
const agentAddress = await provider.resolveName('brick.eth');
console.log('Agent address:', agentAddress);
```

### Get Agent Profile

```javascript
const resolver = await provider.getResolver('brick.eth');

const profile = {
  description: await resolver.getText('description'),
  url: await resolver.getText('url'),
  erc8004: await resolver.getText('agent.erc8004'),
  harness: await resolver.getText('agent.harness'),
  model: await resolver.getText('agent.model')
};
```

### Set Agent Profile

```javascript
const resolver = await provider.getResolver('brick.eth');

await resolver.setText('description', 'AI assistant - Solid & Reliable');
await resolver.setText('agent.erc8004', 'base:0x8004...:32459');
```

## ERC-8004 Integration

The `agent.erc8004` text record links ENS to on-chain identity:

```
Format: <chain>:<registry_address>:<agent_id>
Example: base:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432:32459
```

## Agent Discovery

```javascript
// Discover agents with specific capabilities
async function discoverAgent(ensName) {
  const resolver = await provider.getResolver(ensName);
  const erc8004Ref = await resolver.getText('agent.erc8004');
  
  if (erc8004Ref) {
    const [chain, registry, agentId] = erc8004Ref.split(':');
    return { chain, registry, agentId };
  }
  return null;
}
```

## Target Tracks

- **ENS Identity** ($400-600)
- **ENS Communication** ($400-600)

---

*ENS Brick Identity - Names you can remember.*