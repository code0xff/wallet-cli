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

/**
 * Placeholder values keep the practice version type-safe while the real wallet
 * logic is intentionally left for the exercise.
 */
const TODO_ADDRESS = '0xTODO';
const TODO_KEYSTORE_PATH = '.wallet/keys/TODO.json';
const TODO_TX_HASH = '0xTODO';

/**
 * Describe where sensitive wallet material would normally be logged.
 *
 * This practice project prints these fields so learners can see what a wallet
 * contains, but production wallet software should never log private keys or seed
 * phrases.
 */
function logWalletSecretsTodo(): void {
  console.log('[wallet] Private key: TODO - derive or import the real private key');
  console.log('[wallet] Mnemonic: TODO - print mnemonic only when the wallet has one');
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
  console.log('[wallet] TODO: create a random ethers Wallet');
  console.log('[wallet] TODO: read and validate the password before encrypting the wallet');
  console.log(`[wallet] Generated address: ${TODO_ADDRESS}`);
  logWalletSecretsTodo();

  console.log('[wallet] TODO: save the encrypted wallet JSON through the keystore module');
  console.log(`[wallet] Encrypted keystore saved: ${TODO_KEYSTORE_PATH}`);

  return {
    address: TODO_ADDRESS,
    keystorePath: TODO_KEYSTORE_PATH
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
  console.log('[wallet] TODO: validate the private key format');
  console.log('[wallet] TODO: create an ethers Wallet from the private key');
  console.log('[wallet] TODO: read and validate the password before encrypting the wallet');
  console.log(`[wallet] Imported address: ${TODO_ADDRESS}`);
  logWalletSecretsTodo();

  console.log('[wallet] TODO: save the encrypted wallet JSON through the keystore module');
  console.log(`[wallet] Encrypted keystore saved: ${TODO_KEYSTORE_PATH}`);

  return {
    address: TODO_ADDRESS,
    keystorePath: TODO_KEYSTORE_PATH
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
  console.log('[wallet] TODO: load and decrypt the wallet from the keystore');
  console.log('[wallet] TODO: read the address from the decrypted wallet');
  console.log(`[wallet] Wallet decrypted: ${TODO_ADDRESS}`);
  logWalletSecretsTodo();

  return TODO_ADDRESS;
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
  console.log('[wallet] TODO: load and decrypt the wallet from the keystore');
  console.log(`[wallet] Wallet decrypted: ${TODO_ADDRESS}`);
  logWalletSecretsTodo();

  console.log('[wallet] TODO: create a JsonRpcProvider from ETH_RPC_URL');
  console.log(`[wallet] Fetching balance: ${TODO_ADDRESS}`);
  console.log('[wallet] TODO: call provider.getBalance(address)');
  console.log('[wallet] TODO: format the wei balance into ETH');
  console.log('[wallet] Balance fetched: 0.0 ETH');

  return {
    address: TODO_ADDRESS,
    balanceWei: 0n,
    balanceEth: '0.0'
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

  console.log('[wallet] TODO: validate the recipient address with ethers.isAddress');
  console.log(`[wallet] Recipient address validated: ${to}`);

  console.log('[wallet] TODO: create a JsonRpcProvider from ETH_RPC_URL');
  console.log(`[wallet] Loading and decrypting wallet: ${name}`);
  console.log('[wallet] TODO: load and decrypt the wallet from the keystore');
  console.log('[wallet] TODO: connect the wallet to the provider');
  console.log(`[wallet] Sender address: ${TODO_ADDRESS}`);
  logWalletSecretsTodo();
  console.log(`[wallet] Sending ${amountEth} ETH to ${to}`);
  console.log('[wallet] TODO: parse amountEth into wei with ethers.parseEther');
  console.log('[wallet] TODO: call wallet.sendTransaction({ to, value })');

  console.log(`[wallet] Transaction submitted: ${TODO_TX_HASH}`);

  return {
    hash: TODO_TX_HASH,
    from: TODO_ADDRESS,
    to,
    amountEth
  };
}
