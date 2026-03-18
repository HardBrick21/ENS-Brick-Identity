const { ethers } = require('ethers');

// ENS configuration
const ENS_ADDRESS = '0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e'; // Mainnet ENS registry
const BRICK_ENS = 'brick.eth';

// ERC-8004 reference
const ERC8004_REF = 'base:0x8004A169FB4a3325136EB29fA0ceB6D2e539a432:32459';

/**
 * ENS Agent Profile
 */
const AGENT_PROFILE = {
  description: 'AI assistant - Solid & Reliable like a brick',
  url: 'https://github.com/HardBrick21/Authority-Ledger',
  avatar: '🧱',
  github: 'HardBrick21',
  harness: 'openclaw',
  model: 'astron-code-latest'
};

/**
 * Set ENS text records for agent profile
 */
async function setAgentProfile(ensName, signer) {
  const resolver = await ethers.getResolver(ensName);
  
  console.log(`Setting ENS profile for ${ensName}...`);
  
  // Set text records
  const txs = [];
  
  for (const [key, value] of Object.entries(AGENT_PROFILE)) {
    console.log(`  Setting ${key}: ${value}`);
    const tx = await resolver.setText(key, value);
    txs.push(tx);
  }
  
  // Set ERC-8004 reference
  console.log(`  Setting agent.erc8004: ${ERC8004_REF}`);
  const tx = await resolver.setText('agent.erc8004', ERC8004_REF);
  txs.push(tx);
  
  await Promise.all(txs.map(t => t.wait()));
  
  console.log('✅ ENS profile set!');
}

/**
 * Resolve agent by ENS name
 */
async function resolveAgent(ensName, provider) {
  console.log(`Resolving ${ensName}...`);
  
  const address = await provider.resolveName(ensName);
  console.log(`  Address: ${address}`);
  
  const resolver = await provider.getResolver(ensName);
  
  const profile = {
    address,
    description: await resolver.getText('description'),
    url: await resolver.getText('url'),
    avatar: await resolver.getText('avatar'),
    github: await resolver.getText('com.github'),
    erc8004: await resolver.getText('agent.erc8004'),
    harness: await resolver.getText('agent.harness'),
    model: await resolver.getText('agent.model')
  };
  
  return profile;
}

/**
 * Discover agents via ENS
 */
async function discoverAgents(ensNames, provider) {
  const agents = [];
  
  for (const name of ensNames) {
    try {
      const profile = await resolveAgent(name, provider);
      agents.push({ name, ...profile });
    } catch (error) {
      console.log(`  ${name}: not found`);
    }
  }
  
  return agents;
}

module.exports = {
  setAgentProfile,
  resolveAgent,
  discoverAgents,
  AGENT_PROFILE,
  ERC8004_REF
};