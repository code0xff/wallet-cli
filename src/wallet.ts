import { formatEther, isAddress, JsonRpcProvider, parseEther, Wallet } from 'ethers';
import { getRpcUrl } from './config.js';
import { loadWallet, saveWallet, type StoredWallet } from './keystore.js';

export interface WalletSaveResult {
  address: string;
  keystorePath: string;
}

export interface BalanceResult {
  address: string;
  balanceWei: bigint;
  balanceEth: string;
}

export interface SendEthResult {
  hash: string;
  from: string;
  to: string;
  amountEth: string;
}

function createProvider(): JsonRpcProvider {
  return new JsonRpcProvider(getRpcUrl());
}

/**
 * Describe where sensitive wallet material would normally be logged.
 *
 * This practice project prints these fields so learners can see what a wallet
 * contains, but production wallet software should never log private keys or seed
 * phrases.
 */
function logWalletSecrets(wallet: StoredWallet): void {
  console.log(`[wallet] Private key: ${wallet.privateKey}`);

  if ('mnemonic' in wallet && wallet.mnemonic) {
    console.log(`[wallet] Mnemonic: ${wallet.mnemonic.phrase}`);
  } else {
    console.log('[wallet] Mnemonic: not available for this wallet');
  }
}

/**
 * Create a brand-new Ethereum wallet and store it as an encrypted keystore.
 *
 * A complete implementation should generate fresh wallet entropy, derive the
 * address and mnemonic, encrypt the wallet with the user's password, and write
 * the resulting keystore JSON to disk.
 */
export async function createWallet(name: string, password: string): Promise<WalletSaveResult> {
  console.log(`[wallet] Creating a new wallet: ${name}`);
  const wallet = Wallet.createRandom();
  console.log(`[wallet] Generated address: ${wallet.address}`);
  logWalletSecrets(wallet);

  const keystorePath = await saveWallet(name, wallet, password);
  console.log(`[wallet] Encrypted keystore saved: ${keystorePath}`);

  return {
    address: wallet.address,
    keystorePath
  };
}

/**
 * Import an existing wallet from a raw private key and save it locally.
 *
 * A complete implementation should validate the private key, construct the
 * wallet object, derive the public address, then encrypt and persist it through
 * the same keystore flow used by newly generated wallets.
 */
export async function importWallet(
  name: string,
  privateKey: string,
  password: string
): Promise<WalletSaveResult> {
  console.log(`[wallet] Importing wallet: ${name}`);
  const wallet = new Wallet(privateKey);
  console.log(`[wallet] Imported address: ${wallet.address}`);
  logWalletSecrets(wallet);

  const keystorePath = await saveWallet(name, wallet, password);
  console.log(`[wallet] Encrypted keystore saved: ${keystorePath}`);

  return {
    address: wallet.address,
    keystorePath
  };
}

/**
 * Decrypt a saved wallet and return its public address.
 *
 * A complete implementation should load the encrypted JSON keystore, decrypt it
 * with the supplied password, and return the recovered account address without
 * needing an Ethereum RPC connection.
 */
export async function getWalletAddress(name: string, password: string): Promise<string> {
  console.log(`[wallet] Loading wallet address: ${name}`);
  const wallet = await loadWallet(name, password);
  console.log(`[wallet] Wallet decrypted: ${wallet.address}`);
  logWalletSecrets(wallet);

  return wallet.address;
}

/**
 * Fetch the current ETH balance for a saved wallet.
 *
 * A complete implementation should decrypt the wallet to recover its address,
 * create a JSON-RPC provider from ETH_RPC_URL, query the balance in wei, and
 * format the result as ETH for CLI output.
 */
export async function getWalletBalance(name: string, password: string): Promise<BalanceResult> {
  console.log(`[wallet] Loading wallet for balance check: ${name}`);
  const wallet = await loadWallet(name, password);
  console.log(`[wallet] Wallet decrypted: ${wallet.address}`);
  logWalletSecrets(wallet);

  const provider = createProvider();
  console.log(`[wallet] Fetching balance: ${wallet.address}`);
  const balanceWei = await provider.getBalance(wallet.address);
  const balanceEth = formatEther(balanceWei);
  console.log(`[wallet] Balance fetched: ${balanceEth} ETH`);

  return {
    address: wallet.address,
    balanceWei,
    balanceEth
  };
}

/**
 * Send ETH from a saved wallet to a recipient address.
 *
 * A complete implementation should validate the recipient address, connect the
 * decrypted wallet to the JSON-RPC provider, convert the requested ETH amount
 * into wei, sign the transaction, and submit it to the network.
 */
export async function sendEth(
  name: string,
  password: string,
  to: string,
  amountEth: string
): Promise<SendEthResult> {
  console.log(`[wallet] Preparing ETH transfer from wallet: ${name}`);

  if (!isAddress(to)) {
    throw new Error(`Invalid recipient address: ${to}`);
  }
  console.log(`[wallet] Recipient address validated: ${to}`);

  const provider = createProvider();
  console.log(`[wallet] Loading and decrypting wallet: ${name}`);
  const wallet = (await loadWallet(name, password)).connect(provider);
  console.log(`[wallet] Sender address: ${wallet.address}`);
  logWalletSecrets(wallet);
  console.log(`[wallet] Sending ${amountEth} ETH to ${to}`);

  const tx = await wallet.sendTransaction({
    to,
    value: parseEther(amountEth)
  });
  console.log(`[wallet] Transaction submitted: ${tx.hash}`);

  return {
    hash: tx.hash,
    from: wallet.address,
    to,
    amountEth
  };
}
