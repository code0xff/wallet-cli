#!/usr/bin/env node
import { Command } from 'commander';
import { promptPassword } from './prompt.js';
import {
  createWallet,
  getWalletAddress,
  getWalletBalance,
  importWallet,
  sendEth
} from './wallet.js';

const program = new Command();

program
  .name('eth-wallet')
  .description('Node.js and TypeScript based Ethereum CLI wallet')
  .version('0.1.0');

program
  .command('create')
  .description('Create a new encrypted wallet')
  .requiredOption('-n, --name <name>', 'wallet name')
  .action(async ({ name }: { name: string }) => {
    const password = await promptPassword(true);
    const wallet = await createWallet(name, password);

    console.log(`Address: ${wallet.address}`);
    console.log(`Keystore: ${wallet.keystorePath}`);
  });

program
  .command('import')
  .description('Import a private key into an encrypted wallet')
  .requiredOption('-n, --name <name>', 'wallet name')
  .requiredOption('-k, --private-key <privateKey>', 'private key')
  .action(async ({ name, privateKey }: { name: string; privateKey: string }) => {
    const password = await promptPassword(true);
    const wallet = await importWallet(name, privateKey, password);

    console.log(`Address: ${wallet.address}`);
    console.log(`Keystore: ${wallet.keystorePath}`);
  });

program
  .command('address')
  .description('Print a wallet address')
  .requiredOption('-n, --name <name>', 'wallet name')
  .action(async ({ name }: { name: string }) => {
    const password = await promptPassword();
    const address = await getWalletAddress(name, password);

    console.log(address);
  });

program
  .command('balance')
  .description('Fetch a wallet balance through ETH_RPC_URL')
  .requiredOption('-n, --name <name>', 'wallet name')
  .action(async ({ name }: { name: string }) => {
    const password = await promptPassword();
    const balance = await getWalletBalance(name, password);

    console.log(`${balance.balanceEth} ETH`);
  });

program
  .command('send')
  .description('Send ETH through ETH_RPC_URL')
  .requiredOption('-n, --name <name>', 'wallet name')
  .requiredOption('-t, --to <address>', 'recipient address')
  .requiredOption('-a, --amount <eth>', 'amount in ETH')
  .action(async ({ name, to, amount }: { name: string; to: string; amount: string }) => {
    const password = await promptPassword();
    const tx = await sendEth(name, password, to, amount);

    console.log(`Transaction hash: ${tx.hash}`);
  });

program.parseAsync().catch((error: unknown) => {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`Error: ${message}`);
  process.exitCode = 1;
});
