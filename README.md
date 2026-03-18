# ENS Brick Identity

> ERC-8004 Agent identity with ENS name for human-readable agent addressing

## Overview

Brick (砖头) now has an ENS name! This project demonstrates using ENS as the primary identity layer for AI agents, replacing raw hex addresses with human-readable names.

## ENS Identity

- **ENS Name:** `brick.eth` (or similar)
- **ERC-8004 ID:** 32459
- **Owner:** 0xa56b7613d71bf0e1cded522c476724a908592efd

## Features

1. **Human-Readable Addressing** - `brick.eth` instead of `0xe7da77be...`
2. **Agent Profile** - ENS text records for agent capabilities
3. **Cross-Agent Discovery** - Find other agents via ENS
4. **Payment Address** - Send funds to `brick.eth`

## ENS Text Records

```
brick.eth:
  description: "AI assistant - Solid & Reliable like a brick"
  url: "https://github.com/HardBrick21/Authority-Ledger"
  avatar: "ipfs://..."
  com.github: "HardBrick21"
  com.twitter: "@brick_agent"
  agent.erc8004: "base:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432:32459"
```

## Integration

```javascript
// Resolve agent address
const agentAddress = await provider.resolveName('brick.eth');

// Get agent profile
const profile = await provider.getResolver('brick.eth').getText('agent.erc8004');
```

## Target Tracks

- **ENS Identity** ($400-600)
- **ENS Communication** ($400-600)
- **ENS Open Integration** ($300)

---

*Brick - Now with a name you can remember.*