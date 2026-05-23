import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { HDNodeWallet, Wallet } from 'ethers';

/**
 * Ethers returns different wallet classes depending on how the wallet was
 * created. Random wallets include HD mnemonic data, while imported private keys
 * are plain Wallet instances. Both can encrypt themselves into Web3 keystore
 * JSON and expose the private key/address used by the CLI.
 */
export type StoredWallet = Wallet | HDNodeWallet;

/**
 * Keep keystore files under the current project directory so local development
 * does not accidentally read or write a user's global wallet files.
 */
const keyDir = join(process.cwd(), '.wallet', 'keys');

/**
 * Wallet names become filenames, so restrict them to a small safe character
 * set. This prevents path traversal such as "../other-file" and keeps command
 * output predictable across operating systems.
 */
function assertWalletName(name: string): void {
  if (!/^[a-zA-Z0-9_-]+$/.test(name)) {
    throw new Error('Wallet name may only contain letters, numbers, underscores, and hyphens.');
  }
}

/**
 * Resolve the encrypted keystore path for a wallet name after validating that
 * the name is safe to use as a filename.
 */
export function getKeystorePath(name: string): string {
  assertWalletName(name);
  return join(keyDir, `${name}.json`);
}

/**
 * Encrypt and persist a wallet using the password supplied by the CLI prompt.
 *
 * The directory is created with owner-only permissions, and each keystore file
 * is written with mode 0600 so other local users cannot read it on Unix-like
 * systems. The actual encryption format is provided by ethers, which produces
 * a standard JSON keystore that can later be decrypted with the same password.
 */
export async function saveWallet(name: string, wallet: StoredWallet, password: string): Promise<string> {
  await mkdir(keyDir, { recursive: true, mode: 0o700 });

  const encryptedJson = await wallet.encrypt(password);
  const path = getKeystorePath(name);

  // Add a trailing newline so the JSON file remains pleasant to inspect in a terminal.
  await writeFile(path, `${encryptedJson}\n`, { encoding: 'utf8', mode: 0o600 });
  return path;
}

/**
 * Load an encrypted keystore JSON file and decrypt it into an ethers wallet.
 *
 * This function intentionally returns the decrypted wallet object rather than
 * only the address because later commands need signing capability for sending
 * transactions.
 */
export async function loadWallet(name: string, password: string): Promise<StoredWallet> {
  const path = getKeystorePath(name);
  const encryptedJson = await readFile(path, 'utf8');
  return Wallet.fromEncryptedJson(encryptedJson, password);
}
